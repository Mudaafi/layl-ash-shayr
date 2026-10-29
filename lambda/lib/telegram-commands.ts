import {
  cleanseString,
  sendMessage,
  setMessageReaction,
  TeleIdType,
  TeleMessage
} from 'telegram-interface'
import { getEventsFromEventbrite } from './eventbrite-api'
import {
  getAttendeeCountFromEventId,
  getOMCountFromEventId,
  getOMsFromEventId
} from './supabase-api'
import { cert, ServiceAccount } from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import getFirestore from './firestore'
const botKey = process.env.TELEGRAM_BOT_TOK || ''

export interface TeleMessageFromUser extends TeleMessage {
  from: NonNullable<TeleMessage['from']>
}

export interface TeleMessageCommand extends TeleMessageFromUser {
  text: string
}

const COMMANDS = ['/start', '/identify', '/check_signups', '/adminify']

export function isCommand(msg: TeleMessage): msg is TeleMessageCommand {
  if (!msg.text || msg.from == null) return false
  const command = _extractCommand(msg.text)
  return command != null && COMMANDS.includes(command)
}

export async function runCommand(msg: TeleMessageCommand) {
  const command = _extractCommand(msg.text)
  switch (command) {
    case '/start':
      return sendMessage(botKey, msg.chat.id, 'Welcome :)')

    case '/identify':
      return _runIdentify(msg.from.id, msg.chat.id)

    case '/check_signups':
      const [_, trailing] = _extractArguments(msg.text)
      return _runCheckSignups(
        msg.chat.id,
        msg.message_id,
        msg.message_thread_id as number,
        trailing
      )

    case '/adminify':
      const email = msg.text.replace('/adminify', '').trim()
      return _runAdminify(email, msg.chat.id, msg.message_id, msg.message_thread_id as number)
  }
}

// ---- Commands
async function _runIdentify(userId: TeleIdType, chatId: TeleIdType) {
  return sendMessage(botKey, userId, `Chat ID: ${chatId}`)
}

async function _runCheckSignups(
  chatId: TeleIdType,
  msgId: TeleMessage['message_id'],
  msgThreadId?: number,
  eventId?: string
) {
  await setMessageReaction(botKey, chatId, msgId, [{ emoji: '👀', type: 'emoji' }])

  const events = await getEventsFromEventbrite(process.env.EVENTBRITE_TOK || '')
  events.sort((a, b) => (a.datetime > b.datetime ? -1 : a.datetime === b.datetime ? 0 : 1))

  const latestEvent = events.find((e) => e.id === eventId) || events[0]
  const numberOfAttendees = await getAttendeeCountFromEventId(latestEvent.id)
  const numberOfOMs = await getOMCountFromEventId(latestEvent.id)
  const omList = await getOMsFromEventId(latestEvent.id)
  const eventCapacity = latestEvent.capacity
  const eventName = latestEvent.name

  let text = `<b>🌙 ${eventName}</b>\n\n`
  text += `OM Sign ups: ${numberOfOMs} / 5\n`

  omList?.forEach((om, i) => {
    text += `  ${i + 1}. ${cleanseString(om.name)} (📲 ${cleanseString(om.contact || '?')})\n`
    text += `      socials: ${cleanseString(om.socials || '?')}\n\n`
  })

  text += `\nSign ups (w/o OMs): ${numberOfAttendees} / ${eventCapacity}`

  await sendMessage(botKey, chatId, text, undefined, {
    message_thread_id: msgThreadId
  })

  return setMessageReaction(botKey, chatId, msgId, [{ emoji: '🤓', type: 'emoji' }])
}
async function _runAdminify(
  email: string,
  chatId: TeleIdType,
  msgId: TeleMessage['message_id'],
  msgThreadId?: number
) {
  if (!email) {
    return sendMessage(
      botKey,
      chatId,
      'Please use with your google email address. e.g. /adminify email@gmail.com',
      undefined,
      { reply_to_message_id: msgId, message_thread_id: msgThreadId }
    )
  }

  const serviceAcc: ServiceAccount = {
    clientEmail: 'firebase-adminsdk-fbsvc@laylashshayr.iam.gserviceaccount.com',
    privateKey: process.env.FIREBASE_TOK?.replace(new RegExp('\\\\n', 'g'), '\n'),
    projectId: 'laylashshayr'
  }

  const app = getFirestore(cert(serviceAcc))

  let user
  try {
    user = await getAuth(app).getUserByEmail(email)
  } catch {
    return sendMessage(
      botKey,
      chatId,
      "Hmm, it looks like you haven't tried logging in on the website yet. Please log in via Google on the website first and retry this.",
      undefined,
      { reply_to_message_id: msgId, message_thread_id: msgThreadId }
    )
  }

  const currentClaims = user.customClaims || {}
  currentClaims['admin'] = true
  currentClaims['role'] = 'authenticated' // supabase

  try {
    await getAuth().setCustomUserClaims(user.uid, currentClaims)
  } catch (err) {
    return sendMessage(botKey, chatId, 'Uh oh, ask @mudaafi for some help', undefined, {
      message_thread_id: msgThreadId
    })
  }

  return sendMessage(botKey, chatId, '✅ With great power comes great responsibility', undefined, {
    reply_to_message_id: msgId,
    message_thread_id: msgThreadId
  })
}

// ---- Utilities

function _extractCommand(text: string) {
  if (text.includes('/')) {
    const resRegex = text.replace('@laylashshayr_bot', '').match(/(\/[^ ]+)/g)
    if (resRegex) return resRegex[0]
  }
}

function _extractArguments(text: string) {
  let leading, trailing
  const leadingRegex = text.match(/(.+)\//)
  const trailingRegex = text.match(/.*\/[^ ]+ (.*)/)

  if (leadingRegex) leading = leadingRegex[1].trim()

  if (trailingRegex) trailing = trailingRegex[1].trim()

  return [leading, trailing]
}
