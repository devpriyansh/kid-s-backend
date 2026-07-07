import transporter from './emailTransporter'
import config from '../../configs/app.config'

/**
 * Send an account balance update email.
 *
 * @param {string} toEmail - The recipient's email address.
 * @param {string} transactionType - Type of transaction (Deposit, Withdrawal, Bonus).
 * @param {string} amount - Transaction amount.
 * @returns {Promise<Object>} - The response object.
 */
const balanceUpdateEmail = async (toEmail, transactionType, amount) => {
  try {
    const mailOptions = {
      from: `"${config.get('mail.fromName')}" <${config.get('mail.fromAddress')}>`,
      to: toEmail,
      subject: 'Your Eazy6 Balance Has Been Updated',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
  
        <div style="text-align: center; padding: 20px; background-color: #ffffff;">
          <img src="https://appraphiikp.blob.core.windows.net/oakridgedevuecontainer/logo-red.png" alt="Eazy6 Sports" style="max-height: 50px;">
        </div>
        
        <div style="padding: 0 20px 20px 20px;">
          <h2 style="text-align: center;">Account Balance Updated</h2>
          
          <p>Hi there,</p>
          <p>Your Eazy6 account balance has been updated: <strong>${transactionType} of $${amount}</strong>.</p>
          <p>Log into your Eazy6 account to see the full details of your transaction and keep track of your winnings.</p>
          <p>You can manage your notification settings anytime in the Eazy6 app.</p>
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
    console.log('Balance update email sent:', info.response)
    return { success: true, message: 'Balance update email sent successfully.' }
  } catch (error) {
    console.error('Error sending balance update email:', error)
    return { success: false, message: 'Failed to send balance update email.', error }
  }
}

export { balanceUpdateEmail }
