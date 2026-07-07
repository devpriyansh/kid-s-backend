import dotenv from 'dotenv'
import db from './src/db/models/index.js'
import GetDashboard from './src/services/parent/getDashboard.service.js'
dotenv.config()

async function test () {
  try {
    const result = await GetDashboard.execute({ userId: 1 }, { sequelizeTransaction: null })
    console.log('Successful:', result.successful)
    console.log('Errors:', result.errors)
    console.log('Result:', JSON.stringify(result.result, null, 2))
  } catch (err) {
    console.error('Test Error:', err)
  }
  process.exit(0)
}

test()
