import transporter from './emailTransporter'
import config from '../../configs/app.config'

/**
 * Sends a password change confirmation email to the user.
 *
 * @param {string} toEmail - The recipient's email address.
 * @returns {Promise<Object>} - The response object.
 */
const passwordChangeEmail = async (toEmail) => {
  try {
    const mailOptions = {
      from: `"${config.get('mail.fromName')}" <${config.get('mail.fromAddress')}>`,
      to: toEmail,
      subject: 'Your Eazy6 Password Has Been Changed',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
  
          <div style="text-align: center; padding: 20px; background-color: #ffffff;">
            <img src="https://appraphiikp.blob.core.windows.net/oakridgedevuecontainer/logo-red.png" alt="Eazy6 Sports" style="max-height: 50px;">
          </div>
          
          <div style="padding: 0 20px 20px 20px;">
            <h2 style="text-align: center;">Password Successfully Updated</h2>
            
            <p>Hi there,</p>
            <p>Your Eazy6 password was successfully updated.</p>
            <p>If this wasn’t you, please reset your password immediately for security purposes.</p>
            <p>If you need assistance, our support team is available through the Eazy6 app.</p>
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
    console.log('Password change email sent:', info.response)
    return { success: true, message: 'Password change email sent successfully.' }
  } catch (error) {
    console.error('Error sending password change email:', error)
    return { success: false, message: 'Failed to send password change email.', error }
  }
}

export { passwordChangeEmail }
