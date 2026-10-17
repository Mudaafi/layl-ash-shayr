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
  id: string
}

export interface WebhookPayload {
  api_url: string
  config: {
    user_id: string
    webhook_id: string
    endpoint_url: string
    action: string
  }
}

export interface ApiEvent {
  name: {
    text: string
    html: string
  }
  description: {
    text: string
    html: string
  }
  url: string
  start: {
    local: string
    utc: string
    timezone: string
  }
  end: {
    local: string
    utc: string
    timezone: string
  }
  organization_id: string
  created: string
  changed: string
  published: string
  capacity: string
  capacity_is_custom: string
  status: string
  currency: string
  listed: string
  shareable: string
  invite_only: string
  online_event: string
  show_remaining: string
  tx_time_limit: string
  hide_start_date: string
  hide_end_date: boolean
  locale: string
  is_locked: boolean
  privacy_setting: string
  is_series: string
  is_series_parent: string
  inventory_type: string
  is_reserved_seating: string
  show_pick_a_seat: string
  show_seatmap_thumbnail: string
  show_colors_in_seatmap_thumbnail: string
  source: string
  is_free: string
  version: string
  summary: string
  facebook_event_id: string
  logo_id: string
  organizer_id: string
  venue_id: string
  category_id: string
  subcategory_id: string
  format_id: string
  id: string
  resource_uri: string
  is_externally_ticketed: boolean
  logo: {
    crop_mask: any
    original: {
      url: string
      width: number
      height: number
    }
    id: string
    url: string
    aspect_ratio: string
    edge_color: string
    edge_color_set: boolean
  }
}

export interface ApiEventsResponse {
  pagination: {
    object_count: number
    page_number: number
    page_size: number
    page_count: number
    has_more_items: boolean
  }
  events: Array<ApiEvent>
}
