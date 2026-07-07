import dotenv from 'dotenv'
import db, { sequelize } from './src/db/models/index.js'
dotenv.config()

async function syncDb () {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully to database:', sequelize.config.database)

    await sequelize.query('CREATE SCHEMA IF NOT EXISTS "dfs";')
    await sequelize.query('CREATE SCHEMA IF NOT EXISTS "subscriber_system";')

    // Sync only User model
    await db.User.sync({ alter: true })
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  } finally {
    await sequelize.close()
  }
}

syncDb()
