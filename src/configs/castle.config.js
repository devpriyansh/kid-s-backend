import { Castle } from '@castleio/sdk'

let castle = null

if (!process.env.CASTLE_API_SECRET) {
  console.warn('CASTLE_API_SECRET missing — Castle in SAFE MODE')

  castle = {
    configuration: {
      // minimal valid config so ContextPrepareService does not crash
      apiSecret: null,
      baseUrl: '',
      timeout: 8000,
      allowlisted: [],
      denylisted: [],
      logger: { info () {}, warn () {}, error () {} }
    },

    async filter () {
      return {
        policy: { action: 'allow' },
        failover: true,
        message: 'Castle disabled — filter allow'
      }
    },

    async risk () {
      return {
        policy: { action: 'allow' },
        failover: true,
        message: 'Castle disabled — risk allow'
      }
    }
  }
} else {
  castle = new Castle({ apiSecret: process.env.CASTLE_API_SECRET, timeout: 30000 })
}

export { castle }
