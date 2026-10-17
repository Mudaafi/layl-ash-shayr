import { Attendee, OpenMiccer, ServerError, Event } from '../../types'
import { ApiAttendee, ApiEvent, ApiEventsResponse } from './eventbrite-api-types'

const BASE_URL = 'https://www.eventbriteapi.com/v3'

export async function getAttendeeFromEventByAttendeeId(
  eventbriteToken: string,
  eventId: string,
  attendeeId: string
) {
  const url = new URL(`${BASE_URL}/events/${eventId}/attendees/${attendeeId}`)

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${eventbriteToken}`
    }
  })
  if (!res.ok) {
    throw new ServerError({ statusCode: 400, message: `Error getting attendee: \n\n${res.text}` })
  }

  const apiAttendee = await res.json()

  return transformAttendee(apiAttendee)
}

export async function getEventsFromEventbrite(eventbriteToken: string, page?: number) {
  const url = new URL(`${BASE_URL}/organizations/3007217743843/events`)

  if (page) url.searchParams.append('page', page.toString())

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${eventbriteToken}`
    }
  })

  if (!res.ok) {
    throw new ServerError({ statusCode: 400, message: `Error getting attendees: \n\n${res.text}` })
  }

  const response = (await res.json()) as ApiEventsResponse

  return response.events.map(transformApiEvents)
}

export function transformApiEvents(apiEvents: ApiEvent): Event {
  return {
    id: apiEvents.id,
    capacity: Number(apiEvents.capacity),
    description: apiEvents.description.text,
    name: apiEvents.name.text,
    url: apiEvents.url,
    datetime: new Date(apiEvents.start.local).getTime()
  }
}

export async function getAttendeesFromEventbrite(
  eventbriteToken: string,
  eventId: string,
  page?: number
) {
  const url = new URL(`${BASE_URL}/events/${eventId}/attendees`)

  if (page) url.searchParams.append('page', page.toString())

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${eventbriteToken}`
    }
  })
  if (!res.ok) {
    throw new ServerError({ statusCode: 400, message: `Error getting attendees: \n\n${res.text}` })
  }

  const apiAttendees: Array<ApiAttendee> = (await res.json()).attendees

  return apiAttendees.map(transformAttendee)
}

export function transformAttendee(apiAttendees: ApiAttendee): Attendee {
  const baseAttendee: Attendee = {
    quantity: apiAttendees.quantity,
    basePrice: apiAttendees.costs.base_price.value / 100,
    name: `${apiAttendees.profile.first_name} ${apiAttendees.profile.last_name}`,
    email: apiAttendees.profile.email,
    barcodes: apiAttendees.barcodes.map((x) => x.barcode),
    checkedIn: apiAttendees.checked_in,
    orderId: apiAttendees.order_id,
    eventId: apiAttendees.event_id,
    attendeeId: apiAttendees.id,
    // unresolved
    ticketType: 'General'
  }

  let ticketType: Attendee['ticketType']
  switch (apiAttendees.ticket_class_name) {
    case 'I want to be an open miccer!':
      ticketType = 'Open Miccer'
      break
    case 'Waitlist - I want to be an open miccer!':
      ticketType = 'Waitlist'
      break
    case 'General Admission':
      ticketType = 'General'
      break
    default:
      ticketType = 'Supporter'
  }

  baseAttendee.ticketType = ticketType
  if (ticketType !== 'Open Miccer' && ticketType !== 'Waitlist') {
    return baseAttendee
  }

  const getAnswer = (qn: string) =>
    apiAttendees.answers.find((elem) => elem.question === qn)?.answer

  const openMiccer: OpenMiccer = {
    ...baseAttendee,
    ticketType: ticketType,
    isFirstTimer:
      !getAnswer('Have you ever performed at a spoken word/open-mic before?')
        ?.toLowerCase()
        .includes('yes') || true,
    isEnglishPerformance:
      getAnswer('Will your poetry be predominantly in English?')?.toLowerCase().includes('yes') ||
      false,
    avRequests: getAnswer('Do you have any special requests for the AV/Tech equipment?'),
    socials: getAnswer('Do you have any social media that people can find you/your work on?'),
    // Unresolved
    isTactful: false,
    isPhotographable: false
  }

  const photographableAns =
    getAnswer('Are you comfortable being photographed/filmed as you perform?')?.toLowerCase() || ''
  if (photographableAns.includes('yes')) {
    openMiccer.isPhotographable = true
  } else if (photographableAns.includes('announce')) {
    openMiccer.isPhotographable = 'announce'
  } else {
    openMiccer.isPhotographable = false
  }

  const tactfulAns = getAnswer(
    'I agree that my poem(s) is/are tactful about religious sensitivities and any other sensitive topics. I have also avoided using crude language in it/them.'
  )?.toLowerCase()
  if (tactfulAns?.indexOf('yes') != -1) {
    openMiccer.isTactful = true
  } else if (tactfulAns.indexOf('not sure') != -1) {
    openMiccer.isTactful = 'unsure'
  } else {
    openMiccer.isTactful = false
  }

  const contact = getAnswer('What is your Telegram username or WhatsApp number?')
  if (!/[a-zA-Z]*/.test(contact || '')) {
    openMiccer.whatsapp = contact
  } else {
    openMiccer.telegram = contact
  }

  return openMiccer
}
