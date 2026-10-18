import { Handler, HandlerEvent } from '@netlify/functions'
import { timingSafeEqual } from 'crypto'
import { sendMessage, TeleMessage, TeleUpdate } from 'telegram-interface'
import { isCommand, runCommand } from './lib/telegram-commands'

const botKey = process.env.TELEGRAM_BOT_TOK || ''
const adminId = process.env.ADMIN_ID || ''
const lasHouseId = process.env.LAS_HOUSE_ID || ''

export const handler: Handler = async (event, context) => {
  if (!hasWebhookSecret(event)) return { statusCode: 401, body: 'Unauthorized' }

  if (event.httpMethod == 'POST') {
    const prompt = JSON.parse(event.body ?? 'null')
    await processTelePrompt(prompt)
  }
  return {
    statusCode: 200,
    body: 'done'
  }
}

async function processTelePrompt(prompt: TeleUpdate) {
  try {
    if (prompt.message) await processTeleMsg(prompt.message)
  } catch (e) {
    await processTeleError(prompt, e as Error)
    console.log(e)
  }
}

export async function processTeleMsg(message: TeleMessage) {
  if (!isAdmin(message)) return rejectNonAdmin(message)

  if (message.photo) {
    // return processPhoto(message)
  } else if (isCommand(message)) {
    return runCommand(message)
  }
}

export interface TeleMessageFromUser extends TeleMessage {
  from: NonNullable<TeleMessage['from']>
}

function isAdmin(msg: TeleMessage): msg is TeleMessageFromUser {
  return (
    msg.from != null &&
    (msg.from.id.toString() === adminId || msg.chat.id.toString() === lasHouseId)
  )
}

async function rejectNonAdmin(msg: TeleMessage) {
  if (!msg.text || !msg.from) return
  return sendMessage(botKey, msg.from.id, 'Sorry but I am not authorized to converse with you.')
}

export async function processTeleError(prompt: TeleUpdate, errorMsg: Error) {
  await sendMessage(botKey, adminId, `<b>Error encountered</b>:`)
  await sendMessage(botKey, adminId, JSON.stringify(prompt))
  await sendMessage(botKey, adminId, `${errorMsg.message}`)
}

function hasWebhookSecret(event: HandlerEvent): boolean {
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (!webhookSecret) return false

  const clientSecret = event.headers['x-telegram-bot-api-secret-token'] || ''
  return safeEqual(clientSecret, clientSecret)
}

// Constant-time string comparison
function safeEqual(given: string, expected: string) {
  const a = new Uint8Array(Buffer.from(given))
  const b = new Uint8Array(Buffer.from(expected))
  return a.length == b.length && timingSafeEqual(a, b)
}
