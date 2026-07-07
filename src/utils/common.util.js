/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import { rename } from 'fs'
import AWS from 'aws-sdk'
import { Op, Sequelize } from 'sequelize'
import config from '../configs/app.config'
import db from '../db/models'
import { getOne } from '../helpers/crud'
import { UPLOAD_FILE_SIZE } from '../libs/constants'

// configuring the AWS environment
const s3Client = () => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

  return new AWS.S3()
}

export const comparePassword = async (password, userPassword) => {
  if (!password || !userPassword) {
    return false
  }
  const decodedPassword = Buffer.from(password, 'base64').toString('utf-8') // Decode once
  return await bcrypt.compare(decodedPassword, userPassword)
}
export const comparePasswordMd5 = async (password, userPassword) => {
  if (!password) {
    return false
  }
  if (md5(userPassword) === password) {
    return true
  }
  return false
}

export const filterByTitleSlugContent = (query, search) => {
  search = search
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [
      { title: { [Op.iLike]: `%${search}%` } },
      { slug: { [Op.iLike]: `%${search}%` } },
      { content: { [Op.iLike]: `%${search}%` } }
    ]
  }

  return query
}

export const removeItems = (array, itemsToRemove) =>
  array.filter((v) => !itemsToRemove.includes(v))

export const filterByNameEmail = (query, search) => {
  search = search
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [
      Sequelize.where(
        Sequelize.fn(
          'concat',
          Sequelize.col('first_name'),
          ' ',
          Sequelize.col('last_name')
        ),
        {
          [Op.iLike]: `%${search}%`
        }
      ),
      { email: { [Op.iLike]: `%${search}%` } }
    ]
  }

  return query
}

export const filterByDate = (
  query,
  modelName,
  startDate = null,
  endDate = null
) => {
  endDate = endDate || Date.now()

  if (startDate) {
    query = {
      ...query,
      [Op.and]: [
        Sequelize.where(
          Sequelize.fn('date', Sequelize.col(`${modelName}.updated_at`)),
          '>=',
          new Date(startDate)
        ),
        Sequelize.where(
          Sequelize.fn('date', Sequelize.col(`${modelName}.updated_at`)),
          '<=',
          new Date(endDate)
        )
      ]
    }
  } else {
    query = {
      ...query,
      [Op.or]: [
        Sequelize.where(
          Sequelize.fn('date', Sequelize.col(`${modelName}.updated_at`)),
          '<=',
          new Date(endDate)
        )
      ]
    }
  }

  return query
}

export const getPrimaryCurrencyAmount = async ({ currencyCode, amount }) => {
  const primaryCurrency = await getOne({
    model: db.Currency,
    data: { isPrimary: true }
  })

  const sourceExchangeRate = await getOne({
    model: db.Currency,
    data: { code: currencyCode },
    attributes: ['exchangeRate']
  })

  const conversionRate =
    parseFloat(sourceExchangeRate.exchangeRate) / primaryCurrency.exchangeRate
  amount = Math.abs((amount * conversionRate).toFixed(2))
  return { amount, conversionRate }
}

export const filterByTimestamp = (
  query,
  modelName,
  startDate = null,
  endDate = null
) => {
  endDate = endDate || Date.now()

  if (startDate) {
    query = {
      ...query,
      [Op.and]: [
        Sequelize.where(
          Sequelize.fn('date', Sequelize.col(`${modelName}.timestamp`)),
          '>=',
          new Date(startDate)
        ),
        Sequelize.where(
          Sequelize.fn('date', Sequelize.col(`${modelName}.timestamp`)),
          '<=',
          new Date(endDate)
        )
      ]
    }
  } else {
    query = {
      ...query,
      [Op.or]: [
        Sequelize.where(
          Sequelize.fn('date', Sequelize.col(`${modelName}.timestamp`)),
          '<=',
          new Date(endDate)
        )
      ]
    }
  }

  return query
}

export const signAccessToken = async ({ id, userName, email, sessionId }) => {
  const payload = {
    id, userName, email, subscriberId: 10, userId: id, sessionId
  }
  const jwtToken = jwt.sign(payload, config.get('jwt.loginTokenSecret'), {
    expiresIn: config.get('jwt.loginTokenExpiry')
  })
  return jwtToken
}

export const encryptPassword = (password) => {
  const decodedPassword = Buffer.from(password, 'base64').toString('utf-8') // Decode once
  const salt = bcrypt.genSaltSync(10) // Generate salt
  return bcrypt.hashSync(decodedPassword, salt)
}

export const encryptPasswordMd5 = (password) => {
  const salt = md5.genSaltSync(10)
  return md5.hashSync(Buffer.from(password, 'base64').toString('ascii'), salt)
}

export const validateFile = (res, file) => {
  if (file && file.size > UPLOAD_FILE_SIZE) {
    return 'File size too large'
  }

  if (file && file.mimetype) {
    const fileType = file.mimetype.split('/')[1]
    const supportedFileType = ['png', 'jpg', 'jpeg', 'tiff', 'svg+xml']

    if (!supportedFileType.includes(fileType)) {
      return 'File type not supported'
    }
  }

  return 'ok'
}
export const pageValidation = (pageNo, limit, maxSize = 200) => {
  const pageAsNumber = Number.parseInt(pageNo, 10)
  const sizeAsNumber = Number.parseInt(limit, 10)
  let page = 1
  let size = 15

  if (
    Number.isNaN(pageAsNumber) ||
    pageAsNumber < 0 ||
    Number.isNaN(sizeAsNumber) ||
    sizeAsNumber < 0 ||
    sizeAsNumber > maxSize
  ) {
    return { page, size }
  }

  size = sizeAsNumber
  page = pageAsNumber

  return { page, size }
}
export const filterByName = (query, search) => {
  search = search
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_')
  query = {
    ...query,
    [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }]
  }
  return query
}

/**
 *
 * @param {{mimetype:string, filename:string, path:string, buffer:Buffer }} logo File object from multer
 * @param {string} filename File's name
 * @param {string} key
 * @returns Promise
 */
export const uploadLogo = async (logo, filename, key = undefined) => {
  if (logo.path) {
    return new Promise((resolve, reject) => {
      rename(logo.path, `../public/images/${filename}`, (err) => {
        if (err) reject(err)
        resolve({ Location: `public/images/${filename}` })
      })
    })
  }

  filename = filename.split(' ').join('')

  const bucketParams = {
    Bucket: process.env.AWS_BUCKET,
    Key: filename,
    Body: logo.buffer,
    ACL: 'public-read',
    ContentType: logo.mimetype
  }

  if (key) {
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: key
    }
    s3Client().deleteObject(deleteParams).promise()
  }

  const logoS3 = s3Client().upload(bucketParams).promise()
  return logoS3
}

export function generateRandomUserName (length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let userName = ''
  for (let i = 0; i < length; i++) {
    userName += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return userName
}

export const signRefreshToken = async ({ id, userName, sessionId, extendedExpiry }) => {
  const payload = { id, userName, sessionId }
  const expiry = extendedExpiry
    ? config.get('jwt.extendedRefreshTokenExpiry') // e.g., '30d' for "Keep Me Signed In"
    : config.get('jwt.refreshTokenExpiry') // e.g., '7d' for default
  const jwtToken = jwt.sign(payload, config.get('jwt.refreshTokenSecret'), {
    expiresIn: expiry
  })
  return jwtToken
}

export const verifyRefreshToken = async (token) => {
  try {
    // Verify the token using the secret and return the decoded payload
    const decoded = jwt.verify(token, config.get('jwt.refreshTokenSecret'))
    return { valid: true, payload: decoded }
  } catch (error) {
    // Handle invalid or expired token
    return {
      valid: false,
      error: error.name === 'TokenExpiredError'
        ? 'RefreshTokenExpired'
        : 'InvalidRefreshToken'
    }
  }
}

// Function to generate a valid URL token
export const validUrlToken = async ({ id }) => {
  const payload = { userId: id, subscriberId: 10 }

  // Generate a JWT token without an expiry
  const jwtToken = jwt.sign(payload, config.get('jwt.loginTokenSecret'))

  return jwtToken
}

// Function to verify the valid URL token
export const verifyValidUrlToken = async (token) => {
  try {
    const decoded = jwt.verify(token, config.get('jwt.loginTokenSecret'))
    return { isValid: true, decoded }
  } catch (error) {
    return { isValid: false, error: error.message }
  }
}

export const signLookupToken = async ({ id }) => {
  const payload = {
    userId: id,
    type: 'recovery_lookup'
  }

  const jwtToken = jwt.sign(
    payload,
    config.get('jwt.lookupTokenSecret'),
    {
      expiresIn: config.get('jwt.lookupTokenExpiry')
    }
  )

  return jwtToken
}

export const verifyLookupToken = async (token) => {
  try {
    const decoded = jwt.verify(
      token,
      config.get('jwt.lookupTokenSecret')
    )

    if (decoded.type !== 'recovery_lookup') {
      return { valid: false, error: 'InvalidTokenType' }
    }

    return { valid: true, payload: decoded }
  } catch (error) {
    return {
      valid: false,
      error:
        error.name === 'TokenExpiredError'
          ? 'LookupTokenExpired'
          : 'InvalidLookupToken'
    }
  }
}
