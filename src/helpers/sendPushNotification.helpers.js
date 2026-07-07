import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'
import { fromEnv, fromSSO, fromIni, fromProcess, fromTokenFile, fromInstanceMetadata, fromContainerMetadata } from '@aws-sdk/credential-providers'
import dotenv from 'dotenv'
import config from '../configs/app.config.js'

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
    .catch(() => fromContainerMetadata()) // Load from ECS container
}

/**
 * Sends a push notification via AWS SNS.
 *
 * @param {string} targetArn - The ARN of the endpoint (device or topic) to send the notification.
 * @param {string} message - The message to be sent.
 * @param {string} [subject] - Optional subject (for email notifications).
 * @returns {Promise<Object>} - The response object indicating success or failure.
 */
const sendPushNotification = async (targetArn, message, subject = '') => {
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
      Subject: subject || undefined,
      TargetArn: targetArn
    }

    // Publish the notification
    const result = await snsClient.send(new PublishCommand(params))
    console.log('Push notification sent:', result)

    return { success: true, message: 'Push notification sent successfully.', data: result }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, message: 'Failed to send push notification.', error }
  }
}

export { sendPushNotification }
