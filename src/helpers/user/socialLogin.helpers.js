import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import config from '../../configs/app.config'
import dotenv from 'dotenv'

dotenv.config()

const GOOGLE_CLIENT_ID = config.get('google.clientId') || process.env.GOOGLE_CLIENT_ID
const APPLE_BUNDLE_ID = config.get('apple.bundleId') || process.env.APPLE_BUNDLE_ID

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID)

export const verifySocialToken = async (providerId, token) => {
  try {
    if (providerId === 'google') {
      const ticket = await googleClient.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID })
      // console.log('RESPONSE FROM GOOGLE:  ', ticket);
      return ticket.getPayload()
    }

    if (providerId === 'apple') {
      const client = jwksClient({ jwksUri: 'https://appleid.apple.com/auth/keys' })

      return await new Promise((resolve, reject) => {
        jwt.verify(
          token,
          (header, cb) => {
            client.getSigningKey(header.kid, (err, key) => {
              if (err) return cb(err)
              cb(null, key?.getPublicKey())
            })
          },
          {
            algorithms: ['RS256'],
            issuer: 'https://appleid.apple.com',
            audience: APPLE_BUNDLE_ID
          },
          (err, decoded) => {
            if (err) return reject(err)
            // console.log('Decoded Apple token:', decoded);
            resolve(decoded)
          }
        )
      })
    }

    throw new Error(`Unsupported provider: ${providerId}`)
  } catch (error) {
    if (
      error.message.includes('Token used too late') ||
      error.message.includes('jwt expired') ||
      error.message.includes('TokenExpiredError')
    ) {
      // Create and throw a custom error
      const tokenError = new Error('Your session expired. Please log in again.')
      tokenError.name = 'TokenExpiredErrorType'
      throw tokenError
    }

    // Re-throw other errors
    throw error
  }
}
