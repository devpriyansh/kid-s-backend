import transporter from './emailTransporter'
import config from '../../configs/app.config'

/**
                     * Send a password reset email.
                     *
                     * @param {string} toEmail - The recipient's email address.
                     * @param {string} resetToken - The password reset token.
 * @returns {Promise<Object>} - The response object.
 */
const resetEmail = async (toEmail, resetToken) => {
  try {
    const mailOptions = {
      from: `"${config.get('mail.fromName')}" <${config.get('mail.fromAddress')}>`,
      to: toEmail,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
  
          <div style="text-align: center; padding: 20px; background-color: #ffffff;">
                    <img src="https://appraphiikp.blob.core.windows.net/oakridgedevuecontainer/logo-red.png" alt="Eazy6 Sports" style="max-height: 50px;">
                  </div>
          
          <div style="padding: 0 20px 20px 20px;">
            <h2 style="text-align: center;">Reset Your Password</h2>
            
            <p>Hi there,</p>
            <p>We received a request to reset your password. Use the following token:</p>
            
            <div style="text-align: center; background-color: #f7f7f7; padding: 20px; margin: 20px 0; border-radius: 8px;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #4cb1c3;">${resetToken}</span>
            </div>
            
            <p>If you did not request this, ignore this email.</p>
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
    console.log('Reset email sent:', info.response)
    return { success: true, message: 'Reset email sent successfully.' }
  } catch (error) {
    console.error('Error sending reset email:', error)
    return { success: false, message: 'Failed to send reset email.', error }
  }
}

export { resetEmail }
