import serviceBase from '../../libs/serviceBase';
import ajv from '../../libs/ajv';
import { memoryStore } from '../../libs/memoryStore';

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    otp: { type: 'string', minLength: 6, maxLength: 6 }
  },
  required: ['email', 'otp']
};

const constraints = ajv.compile(schema);

export default class VerifyOtp extends serviceBase {
  get constraints() {
    return constraints;
  }

  async run() {
    const { email, otp } = this.args;
    
    try {
      const emailLower = email.toLowerCase();
      const storedOtp = memoryStore.get(`otp:${emailLower}`);

      if (!storedOtp) {
        return this.addError('OtpExpiredErrorType', 'OTP has expired or does not exist. Please request a new one.');
      }

      if (storedOtp !== otp) {
        return this.addError('InvalidOtpErrorType', 'Invalid OTP code entered.');
      }

      // Valid OTP. Delete the OTP and set verification flag for 30 mins
      memoryStore.del(`otp:${emailLower}`);
      memoryStore.setEx(`verified:${emailLower}`, 1800, 'true');

      return { message: 'Email verified successfully', status: 200, result: { success: true } };
    } catch (error) {
      console.error('Verify OTP Error: ', error);
      return this.addError('InternalServerErrorType', error.message || 'Something went wrong while verifying OTP.');
    }
  }
}
