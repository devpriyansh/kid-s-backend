import db from './src/db/models/index.js'
async function addCol () {
  try {
    await db.sequelize.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS gemini_api_key VARCHAR(255);')
    console.log('Column added')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
addCol()
