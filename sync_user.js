import dotenv from 'dotenv'
import db, { sequelize } from './src/db/models/index.js'
dotenv.config()

async function syncDb () {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully to database:', sequelize.config.database)

    console.log('Syncing User model...')
    await db.User.sync({ force: true, logging: console.log })
    console.log('User model synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database or sync:', error)
  } finally {
    await sequelize.close()
  }
}

syncDb()
