import { createClient } from '@supabase/supabase-js'
import { Attendee } from '../../types'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SECRET_KEY || ''
)

export async function addAttendeesToSupabase(attendee: Array<Attendee> | Attendee) {
  return supabase.from('event_attendees').upsert(attendee, { ignoreDuplicates: false })
}
