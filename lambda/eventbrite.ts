import { Handler, HandlerResponse } from '@netlify/functions'
import { parseCookie } from 'cookie'
import { initializeApp } from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import { ServerError } from '../types'
import { getAttendeesFromEventbrite } from './lib/eventbrite-api'

export const handler: Handler = async (event, context) => {
  const eventbriteToken = process.env.EVENTBRITE_TOK || ''

  try {
    await validateCall({ eventbriteToken, event })

    const paths = event.path.split('/')
    const apiPath = paths.slice(paths.indexOf('eventbrite')).join('/')

    if (apiPath === 'eventbrite') {
      return { statusCode: 200, body: JSON.stringify({ message: 'Success' }) }
    } else if (/eventbrite\/events\/[a-zA-Z0-9]+\/attendees/.test(apiPath)) {
      const eventId = /eventbrite\/events\/([a-zA-Z0-9]+)\/attendees/.exec(apiPath)?.[1]
      if (eventId) {
        const attendees = await getAttendeesFromEventbrite(eventbriteToken, eventId)

        return { statusCode: 200, body: JSON.stringify(attendees) }
      } else {
        throw new ServerError({ statusCode: 400, message: 'Error getting event id' })
      }
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

  if (!requiredVariables.eventbriteToken || !googleIdToken) {
    throw new ServerError({
      statusCode: 500,
      message: "Server doesn't have the required credentials."
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
      statusCode: 404,
      message: 'You are not permitted to perform this operation'
    })

  return true
}
