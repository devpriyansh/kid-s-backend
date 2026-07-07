import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { fromEnv, fromSSO, fromIni, fromProcess, fromTokenFile, fromInstanceMetadata, fromContainerMetadata } from '@aws-sdk/credential-providers'
import dotenv from 'dotenv'
import config from '../configs/app.config.js'

dotenv.config()

/**
 * Get AWS credentials dynamically using multiple fallback mechanisms.
 */
const getAWSCredentials = async () => {
  return fromEnv()()
    .catch(() => fromSSO()())
    .catch(() => fromIni({ profile: 'default' })())
    .catch(() => fromProcess()())
    .catch(() => fromTokenFile()())
    .catch(() => fromInstanceMetadata()())
    .catch(() => fromContainerMetadata())
}

/**
 * Deletes a file from AWS S3.
 *
 * @param {string} fileName - The name of the file to be deleted from S3.
 * @returns {Promise<void>} - Resolves when the file is successfully deleted.
 */
const deleteFileFromS3 = async (fileName) => {
  const credentials = await getAWSCredentials()
  console.log('AWS Credentials Loaded Successfully')

  const s3Client = new S3Client({
    region: config.get('aws.region') || process.env.AWS_REGION || 'us-east-1',
    credentials
  })

  const params = {
    Bucket: config.get('aws.s3Bucket') || process.env.AWS_S3_BUCKET,
    Key: fileName
  }

  await s3Client.send(new DeleteObjectCommand(params))
  console.log(`File deleted successfully: ${fileName}`)
}

export { deleteFileFromS3 }
