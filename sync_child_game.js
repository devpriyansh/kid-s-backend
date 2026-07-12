import dotenv from 'dotenv'
import db, { sequelize } from './src/db/models/index.js'
dotenv.config()

async function syncDb () {
  try {
    await sequelize.authenticate()
    console.log('Connection established.')

    await db.ChildGameProgress.sync({ alter: true })
    console.log('ChildGameProgress synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  } finally {
    await sequelize.close()
  }
}

syncDb()
