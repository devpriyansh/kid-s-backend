import multer from 'multer'
import { join } from 'path'

/**
 *
 * @param {import('express').Request} req
 * @param {{fieldname:string, originalname:string, mimetype:string,}} file
 * @param {Function} cb
 */
const destination = (req, file, cb) => {
  const path = join(__dirname, '../public/images/')
  cb(null, path)
}

/**
 *
 * @param {import('express').Request} req
 * @param {{fieldname:string, originalname:string, mimetype:string,}} file
 * @param {Function} cb
 */
const filename = (req, file, cb) => {
  const ext = file.mimetype.split('/')[1]
  cb(null, `${Date.now()}-${file.fieldname}.${ext}`)
}

const storageConfig = () => {
  if (process.env.NODE_ENV === 'development') { return multer.diskStorage({ destination, filename }) }
  return multer.memoryStorage()
}
const upload = multer({ storage: storageConfig() })

export { upload }
