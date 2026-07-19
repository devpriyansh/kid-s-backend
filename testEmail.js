import 'dotenv/config';
import { sendEmail } from './src/libs/emailer.js';

async function test() {
  console.log('Testing email sender...');
  const result = await sendEmail({
    to: 'priyanshsahu853@gmail.com',
    subject: 'Test Email',
    text: 'This is a test',
    html: '<b>This is a test</b>'
  });
  console.log('Result:', result);
}

test();
