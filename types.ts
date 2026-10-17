import type { HandlerResponse } from '@netlify/functions'

export interface Attendee {
  quantity: number
  basePrice: number
  name: string
  email: string
  barcodes: Array<string>
  checkedIn: boolean
  ticketType: 'Open Miccer' | 'Waitlist' | 'General' | 'Supporter'
  orderId: string
  userId?: string // user id not provided by eventbrite/events/*/attendees
  attendeeId: string
  eventId: string
}

export interface OpenMiccer extends Attendee {
  ticketType: 'Open Miccer' | 'Waitlist'
  telegram?: string
  whatsapp?: string
  socials?: string
  isPhotographable: true | false | 'announce'
  avRequests?: string
  isEnglishPerformance: boolean
  isTactful: true | false | 'unsure'
  isFirstTimer: boolean
}

export interface Event {
  capacity: number
  attendeeCount?: number
  description: string
  id: string
  name: string
  url: string
  datetime: number
}

export class ServerError extends Error {
  serverResponse: HandlerResponse

  constructor(data: Record<string, any>) {
    super(data.message)
    this.serverResponse = {
      statusCode: data.statusCode,
      body: JSON.stringify({
        ...data
      })
    }
  }
}
