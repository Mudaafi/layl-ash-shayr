import { sendMessage, TeleIdType, TeleMessage } from 'telegram-interface'
import { getEventsFromEventbrite } from './eventbrite-api'
import { getAttendeeCountFromEventId } from './supabase-api'
const botKey = process.env.TELEGRAM_BOT_TOK || ''

export interface TeleMessageFromUser extends TeleMessage {
  from: NonNullable<TeleMessage['from']>
}

export interface TeleMessageCommand extends TeleMessageFromUser {
  text: string
}

const COMMANDS = ['/start', '/identify']

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
      return _runCheckSignups(msg.chat.id)
  }
}

// ---- Commands
async function _runIdentify(userId: TeleIdType, chatId: TeleIdType) {
  return sendMessage(botKey, userId, `Chat ID: ${chatId}`)
}

async function _runCheckSignups(chatId: TeleIdType) {
  const events = await getEventsFromEventbrite(process.env.EVENTBRITE_TOK || '')
  events.sort((a, b) => (a.datetime > b.datetime ? -1 : a.datetime === b.datetime ? 0 : 1))

  const latestEvent = events[0]
  const numberOfAttendees = getAttendeeCountFromEventId(latestEvent.id)
  const eventCapacity = latestEvent.capacity
  const eventName = latestEvent.name

  let text = `<b>${eventName}</b>\n\n`
  text += `Sign ups: ${numberOfAttendees} / ${eventCapacity}`

  return sendMessage(botKey, chatId, text)
}

// ---- Utilities

function _extractCommand(text: string) {
  if (text.includes('/')) {
    const resRegex = text.match(/(\/[^ ]+)/g)
    if (resRegex) return resRegex[0]
  }
}

function _extractArguments(text: string) {
  let leading, trailing
  const leadingRegex = text.match(/(.+)\//)
  const trailingRegex = text.match(/.*\/\w+ (.*)/)

  if (leadingRegex) leading = leadingRegex[1].trim()

  if (trailingRegex) trailing = trailingRegex[1].trim()

  return [leading, trailing]
}
