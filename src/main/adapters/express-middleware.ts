import { Middleware } from '@/application/middlewares'

import { RequestHandler } from 'express'

type Adapter = (middleware: Middleware) => RequestHandler

export const adaptExpressMiddleware: Adapter = middleware => async (req, res, next) => {
  const { statusCode, data } = await middleware.handle({ headers: req.headers })
  if (statusCode === 200) {
    Object.assign(req, data)
    next()
  } else {
    res.status(statusCode).json({ error: data.message })
  }
}
