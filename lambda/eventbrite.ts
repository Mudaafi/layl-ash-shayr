import { Handler } from '@netlify/functions'
import { parseCookie } from 'cookie'
import { initializeApp } from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import { getQuestions, isOpenMiccer, ServerError } from '../types'
import {
  getAttendeeFromEventByAttendeeId,
  getAttendeesFromEventbrite,
  getEventsFromEventbrite
} from './lib/eventbrite-api'
import { WebhookPayload } from './lib/eventbrite-api-types'
import { addAttendeesToSupabase } from './lib/supabase-api'
import { sendMessage } from 'telegram-interface'

export const handler: Handler = async (event, context) => {
  const eventbriteToken = process.env.EVENTBRITE_TOK || ''

  try {
    await validateCall({ eventbriteToken, event })

    const paths = event.path.split('/')
    const apiPath = paths.slice(paths.indexOf('eventbrite')).join('/')

    if (apiPath === 'eventbrite') {
      return { statusCode: 200, body: JSON.stringify({ message: 'Success' }) }
    } else if (apiPath === 'eventbrite/webhook_on_attendee_updated') {
      if (!event.body) throw new ServerError({ message: 'event.body is malformed' })

      const body = JSON.parse(event.body) as WebhookPayload
      // https://www.eventbriteapi.com/v3/events/2003257008639/attendees/22871317754/
      const eventId =
        /https:\/\/www.eventbriteapi.com\/v3\/events\/([0-9]+)\/attendees\/[0-9]+\//.exec(
          body.api_url
        )?.[1]
      const attendeeId =
        /https:\/\/www.eventbriteapi.com\/v3\/events\/[0-9]+\/attendees\/([0-9]+)\//.exec(
          body.api_url
        )?.[1]

      if (!eventId || !attendeeId)
        throw new ServerError({ message: 'eventbrite api_url missing fields' })
      const attendee = await getAttendeeFromEventByAttendeeId(eventbriteToken, eventId, attendeeId)
      attendee.userId = body.config.user_id

      // update telegram bot
      let text = `<b>New Sign Up!</b>\n\n`
      text += `Name: ${attendee.name}\n`
      text += `Ticket: ${attendee.ticketType}\n`

      if (isOpenMiccer(attendee)) {
        const qnAndAns = getQuestions(attendee)
        text += '\n<b>💬 Open Miccer Details</b>\n\n'
        text += `Email: ${attendee.email}\n`
        text += `Contact: ${attendee.telegram || attendee.whatsapp}\n`

        text += '\n<b>📝 Open Miccer Questionnaire</b>\n\n'
        qnAndAns.forEach((entry) => {
          text += `<i>${entry[0]}</i>\n`
          text += `${entry[1]}\n\n`
        })
      }
      await sendMessage(
        process.env.TELEGRAM_BOT_TOK || '',
        process.env.LAS_HOUSE_ID || '',
        text,
        undefined,
        { message_thread_id: Number(process.env.LAS_BOT_TOPIC_ID) }
      )

      // update supabase
      await addAttendeesToSupabase(attendee)

      return {
        statusCode: 200,
        body: JSON.stringify({ message: `Webhook on_updated completed for ${attendeeId}` })
      }
    } else if (/eventbrite\/events\/[a-zA-Z0-9]+\/sync/.test(apiPath)) {
      const eventId = /eventbrite\/events\/([a-zA-Z0-9]+)\/sync/.exec(apiPath)?.[1]

      if (eventId) {
        const attendees = await getAttendeesFromEventbrite(eventbriteToken, eventId)
        const res = await addAttendeesToSupabase(attendees)

        if (res.error) {
          throw new ServerError({ status: res.status, message: res.error })
        }

        return {
          statusCode: 200,
          body: JSON.stringify({ message: `Sync of attendees from event ${eventId} complete` })
        }
      }
    } else if (/eventbrite\/events\/[a-zA-Z0-9]+\/attendees/.test(apiPath)) {
      const eventId = /eventbrite\/events\/([a-zA-Z0-9]+)\/attendees/.exec(apiPath)?.[1]
      if (eventId) {
        const attendees = await getAttendeesFromEventbrite(eventbriteToken, eventId)

        return { statusCode: 200, body: JSON.stringify(attendees) }
      }

      throw new ServerError({ statusCode: 400, message: 'Error getting event id' })
    } else if (apiPath === 'eventbrite/events') {
      const events = await getEventsFromEventbrite(eventbriteToken)

      return { statusCode: 200, body: JSON.stringify(events) }
    }
  } catch (err) {
    const serverError = err as ServerError

    if (serverError.serverResponse) return serverError.serverResponse
    console.log(err)
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Request fell through'
    })
  }
}

async function validateCall(requiredVariables: any) {
  const cookieString = requiredVariables.event.headers.cookie || ''
  const googleIdToken = parseCookie(cookieString)['google'] || ''
  const paths = requiredVariables.event.path.split('/')
  const apiPath = paths.slice(paths.indexOf('eventbrite')).join('/')

  if (!requiredVariables.eventbriteToken || !googleIdToken) {
    throw new ServerError({
      statusCode: 500,
      message: "Server doesn't have the required credentials."
    })
  }

  if (apiPath === 'eventbrite/on_attendee_updated') {
    // Damn it eventbrite
    return true
  }

  const firestoreApp = initializeApp({
    projectId: 'laylashshayr'
  })

  const decodedUser = await getAuth(firestoreApp)
    .verifyIdToken(googleIdToken)
    .catch((err) => {
      throw new ServerError({ statusCode: 404, message: err.message })
    })
  const isAdmin = decodedUser.admin

  if (!isAdmin)
    throw new ServerError({
      statusCode: 404,
      message: 'You are not permitted to perform this operation'
    })

  return true
}
