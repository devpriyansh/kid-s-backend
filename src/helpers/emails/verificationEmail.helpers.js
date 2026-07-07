import transporter from './emailTransporter'
import config from '../../configs/app.config'

/**
 * Sends a verification code to the user's email.
 *
 * @param {string} toEmail - Recipient email address.
 * @param {string} verificationCode - Verification code to send.
 * @returns {Promise<Object>} - Result object.
 */
const verificationEmail = async (toEmail, verificationCode) => {
  try {
    const mailOptions = {
      from: `"${config.get('mail.fromName')}" <${config.get(
        'mail.fromAddress'
      )}>`,
      to: toEmail,
      subject: 'Your Eazy6 Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
  
          <div style="text-align: center; padding: 20px; background-color: #ffffff;">
            <img src="https://appraphiikp.blob.core.windows.net/oakridgedevuecontainer/logo-red.png" alt="Eazy6 Sports" style="max-height: 50px;">
          </div>
          
          <div style="padding: 0 20px 20px 20px;">
            <h2 style="text-align: center;">Verify your Eazy6 account</h2>
            
            <p>Hi there,</p>
            <p>Use the verification code below to continue:</p>
            
            <div style="text-align: center; background-color: #f7f7f7; padding: 20px; margin: 20px 0; border-radius: 8px;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px;">${verificationCode}</span>
            </div>
            
            <p>This code expires in 1 hour. If you didn’t request this, you can safely ignore this email.</p>
            <p>— The Eazy6 Sports Team</p>
          </div>
          
          <div style="text-align: center; padding: 20px; font-size: 12px; color: #777;">
            <p style="margin: 5px 0;">© Eazy6 Sports</p>
            <p style="margin: 5px 0;">This is an automated message. Please do not reply.</p>
          </div>
          
        </div>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Verification email sent:', info.response)
    return { success: true, message: 'Verification email sent successfully.' }
  } catch (error) {
    console.error('Error sending verification email:', error)
    return {
      success: false,
      message: 'We couldn’t send the email. Please try again.',
      error
    }
  }
}

export { verificationEmail }
