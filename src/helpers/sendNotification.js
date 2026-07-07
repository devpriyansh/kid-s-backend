import { notificationApp } from '../configs/firbase/firebase-admin-config.js'
import db from '../db/models'
import { isUserSelfExcluded } from './user/selfExclusion.helpers'

const sendNotification = async (deviceToken, payload) => {
  const user = await db.User.findOne({ where: { deviceToken } })
  if (user) {
    const excluded = await isUserSelfExcluded(user.id)
    if (excluded) {
      console.log('Push notification blocked due to self-exclusion/timeout')
      return
    }
  }

  const message = {
    notification: {
      title: payload.title,
      body: payload.body
    },
    data: {
      type: String(payload.notificationType)
    },
    token: deviceToken
  }

  try {
    const response = await notificationApp.messaging().send(message)
    console.log('✅ Successfully sent:', response)
  } catch (error) {
    console.error('❌ Error sending message:', error)
    if (error.code === 'messaging/registration-token-not-registered') {
      console.log('Token is invalid, delete from DB.')
    }
  }
}

export { sendNotification }
