import { ref } from 'vue'
import { type Event, type Attendee } from '../../types'
import { createClient } from '@supabase/supabase-js'
import { useStorage } from '@vueuse/core'

const BASE_URL = import.meta.env.VITE_FN_EVENTBRITE_URL
const attendees = ref<Array<Attendee>>()
const events = useStorage<Array<Event>>('events', [], localStorage)

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    accessToken: async () => {
      const jwt = (await cookieStore.get('google'))?.value

      return jwt || null
    }
  }
)

export default function useEventbrite() {
  async function fetchAttendees(eventId: string) {
    const res = await supabase.from('event_attendees').select().eq('eventId', eventId)
    const fetchedAttendees = (res.data as Array<Attendee>) || attendees.value
    const attendeesMap: { [orderId: string]: Attendee } = {}
    fetchedAttendees?.forEach((attendee) => {
      if (!attendeesMap[attendee.orderId]) {
        attendeesMap[attendee.orderId] = attendee
      } else {
        attendeesMap[attendee.orderId].quantity += attendee.quantity
        attendeesMap[attendee.orderId].basePrice += attendee.basePrice
        attendeesMap[attendee.orderId].barcodes.push(...attendee.barcodes)

        const ticketPriority: Array<Attendee['ticketType']> = [
          'General',
          'Supporter',
          'Waitlist',
          'Open Miccer'
        ]
        if (
          ticketPriority.indexOf(attendee.ticketType) >
          ticketPriority.indexOf(attendeesMap[attendee.orderId].ticketType)
        ) {
          attendeesMap[attendee.orderId].ticketType = attendee.ticketType
        }
      }
    })

    attendees.value = Object.values(attendeesMap) || attendees.value
  }

  async function fetchEvents() {
    const url = new URL(`${BASE_URL}/events`)
    const fetchedEvents = (await (await fetch(url)).json()) as Array<Event>

    events.value = fetchedEvents.sort((a, b) =>
      a.datetime > b.datetime ? -1 : a.datetime === b.datetime ? 0 : 1
    )
  }

  async function toggleCheckInAttendee(attendeeId: string) {
    console.log('🚀 ~ toggleCheckInAttendee ~ attendees:', attendees.value)
    const attendee = attendees.value?.find((x) => x.attendeeId === attendeeId)

    if (!attendee) return
    attendee.checkedIn = !attendee.checkedIn

    await supabase
      .from('event_attendees')
      .update({ checkedIn: attendee.checkedIn })
      .eq('attendeeId', attendee.attendeeId)
  }

  return {
    events,
    fetchEvents,
    attendees,
    fetchAttendees,
    toggleCheckInAttendee
  }
}
