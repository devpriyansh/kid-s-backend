import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import config from '../../configs/app.config'

import db from '../../db/models'
import { isUserSelfExcluded } from '../user/selfExclusion.helpers'

dotenv.config()
const transporter = nodemailer.createTransport({
  host: config.get('mail.host'),
  port: config.get('mail.port'),
  secure: false, // Use false for TLS on port 587
  auth: {
    user: config.get('mail.username'),
    pass: config.get('mail.password')
  }
})

const originalSendMail = transporter.sendMail.bind(transporter)

transporter.sendMail = async function (mailOptions) {
  const toEmail = mailOptions.to
  if (toEmail) {
    const user = await db.User.findOne({ where: { email: toEmail } })
    if (user) {
      const excluded = await isUserSelfExcluded(user.id)
      if (excluded) {
        console.log(`Email to ${toEmail} blocked due to self-exclusion/timeout`)
        return { success: false, message: 'Email blocked due to self-exclusion/timeout' }
      }
    }
  }
  return originalSendMail(mailOptions)
}

export default transporter
