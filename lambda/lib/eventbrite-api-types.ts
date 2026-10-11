export interface ApiCost {
  display: string
  currency: string
  value: number
  major_value: string
}

export interface ApiAnswer {
  question: string
  answer: string
  question_id: string
  type: string
}

export interface ApiBarcode {
  status: string
  created: string
  checkin_type: 0
  is_printed: boolean
  changed: string
  barcode: string
}

export interface ApiAttendee {
  costs: {
    base_price: ApiCost
    eventbrite_fee: ApiCost
    gross: ApiCost
    payment_fee: ApiCost
    tax: ApiCost
  }
  resource_uri: string
  id: string
  changed: string
  created: string
  quantity: 1
  variant_id: null
  profile: {
    addresses: any
    last_name: string
    name: string
    email: string
    first_name: string
  }
  barcodes: Array<ApiBarcode>
  answers: Array<ApiAnswer>
  checked_in: boolean
  cancelled: boolean
  refunded: boolean
  affiliate: string
  guestlist_id: string | null
  invited_by: string | null
  status: string
  ticket_class_name:
    | 'I want to be an open miccer!'
    | 'Waitlist - I want to be an open miccer!'
    | 'General Admission'
  delivery_method: 'will_call' | 'electronic' | 'standard_shipping' | 'third_party_shipping'
  release_time_utc: string | null
  event_id: string
  order_id: string
  ticket_class_id: string
}
