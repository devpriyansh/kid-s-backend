import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'
import { fromEnv, fromSSO, fromIni, fromProcess, fromTokenFile, fromInstanceMetadata, fromContainerMetadata } from '@aws-sdk/credential-providers'
import dotenv from 'dotenv'
import config from '../configs/app.config'

// Load environment variables from .env file
dotenv.config()

/**
 * Configure AWS SDK credentials using @aws-sdk/credential-providers
 */
const getAWSCredentials = async () => {
  return fromEnv()() // Load from environment variables
    .catch(() => fromSSO()()) // Load from AWS SSO
    .catch(() => fromIni({ profile: 'default' })()) // Load from shared credentials file
    .catch(() => fromProcess()()) // Load from process credentials
    .catch(() => fromTokenFile()()) // Load from web identity token
    .catch(() => fromInstanceMetadata()()) // Load from EC2 metadata
    .catch(() => fromContainerMetadata()()) // Load from ECS container
}

/**
 * Send an SMS using AWS SNS.
 *
 * @param {string} phoneNumber - The recipient's phone number in E.164 format (e.g., +1234567890).
 * @param {string} message - The SMS message content.
 * @returns {Promise<Object>} - The response object indicating success or failure.
 */
const sendSMSAws = async (phoneNumber, message) => {
  try {
    const credentials = await getAWSCredentials()
    console.log('AWS Credentials Loaded Successfully')

    const snsClient = new SNSClient({
      region: config.get('aws.region') || process.env.AWS_REGION || 'us-east-1',
      credentials
    })

    // Define SNS publish parameters
    const params = {
      Message: message,
      PhoneNumber: phoneNumber
    }

    // Publish the SMS
    const result = await snsClient.send(new PublishCommand(params))
    console.log('SMS sent:', result)

    return { success: true, message: 'SMS sent successfully.', data: result }
  } catch (error) {
    console.error('Error sending SMS:', error)
    return { success: false, message: 'Failed to send SMS.', error }
  }
}

export { sendSMSAws }
