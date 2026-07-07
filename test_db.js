import dotenv from 'dotenv'
import db, { sequelize } from './src/db/models/index.js'
dotenv.config()

async function recreate () {
  try {
    console.log('Exported models:', Object.keys(db))

    // User tables
    console.log('Dropping and recreating User table...')
    await db.User.sync({ force: true })

    console.log('Dropping and recreating UserSession table...')
    await db.UserSession.sync({ force: true })

    // Kid's Website specific tables
    console.log('Dropping and recreating Child table...')
    await db.Child.sync({ force: true })

    console.log('Dropping and recreating Quiz table...')
    await db.Quiz.sync({ force: true })

    console.log('Dropping and recreating Question table...')
    await db.Question.sync({ force: true })

    console.log('Dropping and recreating ActivityResult table...')
    await db.ActivityResult.sync({ force: true })

    console.log('All tables recreated successfully.')
  } catch (error) {
    console.error('Error recreating tables:', error)
  }
  process.exit(0)
}

recreate()
