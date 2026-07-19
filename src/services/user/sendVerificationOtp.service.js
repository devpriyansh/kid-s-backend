import serviceBase from '../../libs/serviceBase';
import ajv from '../../libs/ajv';
import { memoryStore } from '../../libs/memoryStore';
import { sendEmail } from '../../libs/emailer';

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
  },
  required: ['email']
};

const constraints = ajv.compile(schema);

export default class SendVerificationOtp extends serviceBase {
  get constraints() {
    return constraints;
  }

  async run() {
    const { email } = this.args;
    
    try {
      // Generate a 6 digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Store in memory for 5 minutes (300 seconds)
      memoryStore.setEx(`otp:${email.toLowerCase()}`, 300, otp);

      const subject = 'Your KidzLearn Verification Code';
      const text = `Your email verification code is: ${otp}. It will expire in 5 minutes.`;
      const html = `<div style="font-family: sans-serif; text-align: center; padding: 20px;">
        <h2>Verify Your Email</h2>
        <p>Use the code below to verify your email address for KidzLearn. It will expire in 5 minutes.</p>
        <h1 style="color: #ec4899; letter-spacing: 4px;">${otp}</h1>
      </div>`;

      const emailResponse = await sendEmail({ to: email, subject, text, html });

      if (!emailResponse.success) {
        return this.addError('EmailSendErrorType', 'Failed to send verification email. Please try again later.');
      }

      return { message: 'OTP sent successfully', status: 200, result: { success: true } };
    } catch (error) {
      console.error('Send OTP Error: ', error);
      return this.addError('InternalServerErrorType', error.message || 'Something went wrong while sending OTP.');
    }
  }
}
