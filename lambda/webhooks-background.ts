import { BackgroundHandler, Config } from '@netlify/functions'
import { getQuestions, isOpenMiccer, ServerError } from '../types'
import { WebhookPayload } from './lib/eventbrite-api-types'
import { getAttendeeFromEventByAttendeeId } from './lib/eventbrite-api'
import { sendMessage } from 'telegram-interface'
import { addAttendeesToSupabase } from './lib/supabase-api'

export const config: Config = {
  background: true
}

export const handler: BackgroundHandler = async (event, context) => {
  const eventbriteToken = process.env.EVENTBRITE_TOK || ''

  try {
    const paths = event.path.split('/')
    const apiPath = paths.slice(paths.indexOf('webhooks-background')).join('/')

    if (apiPath === 'webhooks-background') {
      console.log({ statusCode: 200, body: JSON.stringify({ message: 'Success' }) })
      return
    } else if (apiPath === 'webhooks-background/eventbrite_on_attendee_updated') {
      await validateCall({ eventbriteToken, event })

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
      // await sendMessage(
      //   process.env.TELEGRAM_BOT_TOK || '',
      //   process.env.LAS_HOUSE_ID || '',
      //   text,
      //   undefined,
      //   { message_thread_id: Number(process.env.LAS_BOT_TOPIC_ID) }
      // )

      // update supabase
      await addAttendeesToSupabase(attendee)

      console.log({
        statusCode: 200,
        body: JSON.stringify({ message: `Webhook on_updated completed for ${attendeeId}` })
      })
      return
    }
  } catch (err) {
    console.log(err)

    return
  }

  console.log({
    statusCode: 400,
    body: JSON.stringify({
      message: 'Request fell through'
    })
  })
  return
}

async function validateCall(requiredVariables: any) {
  const paths = requiredVariables.event.path.split('/')
  const apiPath = paths.slice(paths.indexOf('webhooks-background')).join('/')

  if (
    Object.keys(requiredVariables).includes('eventbriteToken') &&
    !requiredVariables.eventbriteToken
  ) {
    throw new ServerError({
      statusCode: 500,
      message: "Server doesn't have the required credentials."
    })
  }

  if (apiPath === 'webhooks-background/eventbrite_on_attendee_updated') {
    // Damn it eventbrite
    return true
  }

  throw new ServerError({
    statusCode: 400,
    message: "Server doesn't recognize you."
  })
}
