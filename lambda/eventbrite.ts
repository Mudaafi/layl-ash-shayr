import { Handler } from '@netlify/functions'
import { parseCookie } from 'cookie'
import { initializeApp } from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import { ServerError } from '../types'
import { getAttendeesFromEventbrite, getEventsFromEventbrite } from './lib/eventbrite-api'
import { addAttendeesToSupabase } from './lib/supabase-api'

export const handler: Handler = async (event, context) => {
  const eventbriteToken = process.env.EVENTBRITE_TOK || ''

  try {
    await validateCall({ eventbriteToken, event })

    const paths = event.path.split('/')
    const apiPath = paths.slice(paths.indexOf('eventbrite')).join('/')

    if (apiPath === 'eventbrite') {
      return { statusCode: 200, body: JSON.stringify({ message: 'Success' }) }
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

  if (!requiredVariables.eventbriteToken) {
    throw new ServerError({
      statusCode: 500,
      message: "Server doesn't have the required credentials."
    })
  }

  if (!googleIdToken) {
    throw new ServerError({
      statusCode: 401,
      message: 'You are not passing the right credentials'
    })
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
      statusCode: 403,
      message: 'You are not permitted to perform this operation'
    })

  return true
}
