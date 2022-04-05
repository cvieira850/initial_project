import { Controller } from '@/application/controllers'
import { HttpRequest } from '@/application/helpers'

import { RequestHandler } from 'express'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const httpRequest: HttpRequest = {
      params: req.params,
      body: req.body,
      query: req.query,
      locals: req.locals,
      headers: req.headers,
      accountId: req.accountId
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(200).json(httpResponse.data)
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.data.message })
    }
  }
}
