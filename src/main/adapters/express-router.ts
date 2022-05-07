import { Controller } from '@/application/controllers'

import { RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req, res) => {
  const { statusCode, data } = await controller.handle({ body: req.body, locals: req.locals, query: req.query, params: req.params, headers: req.headers, accountId: req.accountId })
  const json = [200, 201, 204].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)
}
