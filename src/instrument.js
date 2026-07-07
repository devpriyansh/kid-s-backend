// src/instrument.js
import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import dotenv from 'dotenv'

dotenv.config()

// console.log("Env sentry = ", process.env.SENTRY_DSN);

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  integrations: [
    Sentry.expressIntegration(), // hooks into Express
    nodeProfilingIntegration() // optional profiling
  ],

  tracesSampleRate: 1.0, // tune down in prod (e.g. 0.2)
  profilesSampleRate: 1.0,
  environment: process.env.NODE_ENV || 'development'
})
