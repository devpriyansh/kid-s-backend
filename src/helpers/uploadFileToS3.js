import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
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
 * Uploads a file to AWS S3.
 *
 * @param {Buffer} fileBuffer - The file data as a buffer.
 * @param {string} fileName - The name of the file to be stored in S3.
 * @param {string} fileType - The MIME type of the file.
 * @returns {Promise<string>} - The URL of the uploaded file.
 */
const uploadFileToS3 = async (fileBuffer, fileName, fileType) => {
  try {
    const credentials = await getAWSCredentials()

    const s3Client = new S3Client({
      region: config.get('aws.region') || process.env.AWS_REGION || 'us-east-1',
      credentials
    })

    const params = {
      Bucket: config.get('aws.s3Bucket') || process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: fileBuffer,
      ContentType: fileType
    }

    await s3Client.send(new PutObjectCommand(params))

    return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${fileName}`
  } catch (error) {
    console.error('Error uploading file:', error)
    throw new Error('File upload failed')
  }
}

export { uploadFileToS3 }
