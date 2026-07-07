import * as admin from 'firebase-admin'
import * as path from 'path'

/**
 * Load Firebase service account credentials.
 *
 * Priority:
 *  1. FIREBASE_SERVICE_ACCOUNT env var (base64-encoded JSON string) — used in
 *     production/Docker so keys can be rotated without rebuilding the image.
 *  2. eazy6.json file — fallback for local development.
 *
 * To encode for the env var:
 *   base64 -w 0 src/configs/firbase/eazy6.json
 */
let serviceAccountPartner

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const decoded = Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT,
      'base64'
    ).toString('utf8')
    serviceAccountPartner = JSON.parse(decoded)
    console.log('🔥 Firebase: loaded credentials from FIREBASE_SERVICE_ACCOUNT env var')
  } catch (err) {
    console.error('❌ Firebase: failed to parse FIREBASE_SERVICE_ACCOUNT env var:', err.message)
    throw err
  }
} else {
  serviceAccountPartner = require(path.resolve(__dirname, './eazy6.json'))
  console.log('🔥 Firebase: loaded credentials from eazy6.json file')
}

const notificationApp = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccountPartner)
  },
  'notificationApp'
)

export { notificationApp }
