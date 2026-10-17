import type { Attendee, OpenMiccer } from '../../../types'

function isOpenMiccer(attendee: Attendee): attendee is OpenMiccer {
  const relevantTicketTypes: Array<Attendee['ticketType']> = ['Open Miccer', 'Waitlist']

  return relevantTicketTypes.includes(attendee.ticketType)
}

export function getQuestions(attendee: Attendee) {
  const questionAnswerMap: { [qn: string]: any } = {}

  if (!isOpenMiccer(attendee)) {
    return []
  }

  questionAnswerMap['Have you ever performed at a spoken word/open-mic before?'] =
    attendee.isFirstTimer ? 'Yes' : 'No'
  questionAnswerMap['Will your poetry be predominantly in English?'] = attendee.isEnglishPerformance
    ? 'Yes'
    : 'No'
  questionAnswerMap['Are you comfortable being photographed/filmed as you perform?'] =
    attendee.isPhotographable === 'announce'
      ? "No I'm not. Please announce it before I perform."
      : true
      ? 'Yes'
      : 'No, please do not photograph me.'
  questionAnswerMap[
    'I agree that my poem(s) is/are tactful about religious sensitivities and any other sensitive topics. I have also avoided using crude language in it/them.'
  ] =
    attendee.isTactful === 'unsure'
      ? "I'm not sure, please help me check"
      : true
      ? 'Yes'
      : "No. I'm out for blood"

  if (attendee.avRequests) {
    questionAnswerMap['Do you have any special requests for the AV/Tech equipment?'] =
      attendee.avRequests
  }

  if (attendee.socials) {
    questionAnswerMap['Do you have any social media that people can find you/your work on?'] =
      attendee.socials
  }

  if (attendee.telegram) {
    questionAnswerMap['Telegram?'] = attendee.telegram
  }

  if (attendee.whatsapp) {
    questionAnswerMap['Whatsapp?'] = attendee.whatsapp
  }

  return Object.entries(questionAnswerMap)
}
