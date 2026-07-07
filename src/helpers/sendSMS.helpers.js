import { Vonage } from '@vonage/server-sdk'
import dotenv from 'dotenv'
import config from '../configs/app.config'

dotenv.config()

const vonage = new Vonage({
  apiKey: config.get('vonage.apiKey') || process.env.VONAGE_SMS_API_KEY || '',
  apiSecret:
    config.get('vonage.apiSecret') || process.env.VONAGE_SMS_API_SECRET || ''
})

const digitsOnly = (s) => s.replace(/\D/g, '')

const pickSenderFor = (to) => {
  const e164 = to.trim() // keep + for 'to'
  const msisdn = digitsOnly(e164)
  if (!msisdn) {
    throw new Error('Invalid phone number format.')
  }
  // US/CA
  if (msisdn.startsWith('1')) {
    return '14705603299'
  }
  // India
  if (msisdn.startsWith('91')) {
    return 'Eazy6'
  }
  if (msisdn.startsWith('63')) {
    return 'Eazy6'
  }
  return '14705603299'
}

const sendSMS = async (to, text, from) => {
  try {
    const sender = pickSenderFor(to)
    console.log(to, '----------to-------------------', sender)
    const response = await vonage.sms.send({ to, from: sender, text })
    const parts = response?.messages || []
    const failed = parts.filter((m) => m.status !== '0')
    if (failed.length > 0) {
      const reasons = failed.map((m) => ({
        status: m.status,
        errorText: m['error-text'],
        remainingBalance: m['remaining-balance'],
        messagePrice: m['message-price'],
        network: m.network
      }))
      console.error('Vonage partial/failed parts:', reasons)

      return {
        success: false,
        message: 'Some or all SMS parts failed.',
        data: response,
        error: reasons
      }
    }

    console.log(
      'SMS sent OK:',
      parts.map((m) => ({ id: m['message-id'], price: m['message-price'] }))
    )
    return { success: true, message: 'SMS sent successfully.', data: response }
  } catch (error) {
    const details = error?.response || error?.messages || error?.details || {}
    const msg = Array.isArray(details.messages)
      ? details.messages[0]
      : undefined

    console.error('Vonage send error:', {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      status: msg?.status,
      errorText: msg?.['error-text'],
      network: msg?.network,
      remainingBalance: msg?.['remaining-balance'],
      messagePrice: msg?.['message-price'],
      raw: details
    })

    return { success: false, message: 'Failed to send SMS.', error: details }
  }
}

export { sendSMS }
