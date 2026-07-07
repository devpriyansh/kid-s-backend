import express from 'express'
import onHealthCheck from '../../libs/onHealthCheck'
import contextMiddleware from '../middlewares/context.middleware'
import apiRouter from './api'

import fs from 'fs'

const router = express.Router()
router.use('/api', (req, res, next) => {
  fs.appendFileSync('api_log.txt', 'HIT /api route: ' + req.method + ' ' + req.url + '\n')
  console.log('HIT /api route:', req.method, req.url)
  next()
}, contextMiddleware, apiRouter)

router.get('/health-check', async (_, res) => {
  try {
    const response = await onHealthCheck()
    res.json(response)
  } catch (error) {
    res.status(503)
    res.send()
  }
})

export default router
