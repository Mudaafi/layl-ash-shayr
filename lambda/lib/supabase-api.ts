import { createClient } from '@supabase/supabase-js'
import { Attendee } from '../../types'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SECRET_KEY || ''
)

export async function addAttendeesToSupabase(attendee: Array<Attendee> | Attendee) {
  return supabase.from('event_attendees').upsert(attendee, { ignoreDuplicates: false })
}

export async function getAttendeeCountFromEventId(eventId: string) {
  return (
    await supabase
      .from('event_attendees')
      .select('id', { count: 'exact' })
      .eq('eventId', eventId)
      .neq('ticketType', 'Open Miccer')
  ).count
}

export async function getOMCountFromEventId(eventId: string) {
  return (
    await supabase
      .from('event_attendees')
      .select('id', { count: 'exact' })
      .eq('eventId', eventId)
      .eq('ticketType', 'Open Miccer')
  ).count
}

export async function getOMsFromEventId(eventId: string) {
  const raw = await supabase
    .from('event_attendees')
    .select('name, telegram, phoneNumber, socials')
    .eq('eventId', eventId)
    .eq('ticketType', 'Open Miccer')

  const OMs = raw.data?.map((x) => ({
    ...x,
    contact: x.telegram
      ? x.telegram.indexOf('@') === -1
        ? `@${x.telegram}`
        : x.telegram
      : x.phoneNumber
  }))

  return OMs
}
