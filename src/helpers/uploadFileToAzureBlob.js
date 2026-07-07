import { WorkloadIdentityCredential } from '@azure/identity'
import { BlobServiceClient } from '@azure/storage-blob'
import dotenv from 'dotenv'
import config from '../configs/app.config.js'

dotenv.config()

/**
 * Uploads a file to Azure Blob Storage using WorkloadIdentityCredential.
 *
 * @param {Buffer} fileBuffer - The file data as a buffer.
 * @param {string} fileName - The name of the file to be stored in the container.
 * @param {string} fileType - The MIME type of the file.
 * @returns {Promise<string>} - The URL of the uploaded blob.
 */
const uploadFileToAzureBlob = async (fileBuffer, fileName, fileType) => {
  try {
    const credential = new WorkloadIdentityCredential({
      tenantId: config.get('azure.tenantId') || process.env.AZURE_TENANT_ID,
      clientId: config.get('azure.clientId') || process.env.AZURE_CLIENT_ID,
      tokenFilePath: config.get('azure.tokenFilePath') || process.env.AZURE_FEDERATED_TOKEN_FILE
    })

    const accountName = config.get('azure.accountName') || process.env.AZURE_STORAGE_ACCOUNT_NAME
    const containerName = config.get('azure.containerName') || process.env.AZURE_CONTAINER_NAME

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      credential
    )

    const containerClient = blobServiceClient.getContainerClient(containerName)
    const blockBlobClient = containerClient.getBlockBlobClient(fileName)

    await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: {
        blobContentType: fileType
      }
    })

    return `https://${accountName}.blob.core.windows.net/${containerName}/${fileName}`
  } catch (error) {
    console.error('Error uploading file to Azure Blob:', error)
    throw new Error('Azure Blob upload failed')
  }
}

export { uploadFileToAzureBlob }
