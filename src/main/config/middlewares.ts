import { Express, json } from 'express'
import cors from 'cors'
import pinoHttp from 'pino-http'
// import helmet from 'helmet'
// import compression from 'compression'
// import statusMonitor from 'express-status-monitor'
import { logger } from '@/main/config/logger'

export const setupMiddlewares = (app: Express): void => {
  // app.use(helmet())
  app.use(pinoHttp({ logger: logger }))
  // app.use(statusMonitor({ path: '/monitor' }))
  // app.use(compression())
  app.use(cors())
  app.use(json())
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
}
