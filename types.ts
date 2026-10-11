import { HandlerResponse } from '@netlify/functions'

export interface Attendee {
  quantity: number
  basePrice: number
  id: string
  name: string
  email: string
  barcodes: Array<string>
  checkedIn: boolean
  ticketType: 'Open Miccer' | 'Waitlist' | 'General' | 'Supporter'
  orderId: string
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
