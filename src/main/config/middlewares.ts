import { Express, json } from 'express'
import cors from 'cors'
// import * as expressPinoLogger from 'express-pino-logger'
import pinoHttp from 'pino-http'
import { logger } from '@/main/config/logger'
// import logger from 'morgan'

export const setupMiddlewares = (app: Express): void => {
  // app.use(logger('dev'))
  app.use(pinoHttp({ logger: logger }))
  app.use(cors())
  app.use(json())
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
}
