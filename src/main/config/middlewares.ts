import { Express, json } from 'express'
import cors from 'cors'
import logger from 'morgan'

export const setupMiddlewares = (app: Express): void => {
  app.use(logger('dev'))
  app.use(cors())
  app.use(json())
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
}
