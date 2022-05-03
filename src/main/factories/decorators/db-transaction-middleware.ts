import { Middleware } from '@/application/middlewares'
import { DbTransactionMiddleware } from '@/application/decorators'
import { makePgConnection } from '@/main/factories/infra/helpers'

export const makePgTransactionMiddleware = (controller: Middleware): DbTransactionMiddleware => {
  return new DbTransactionMiddleware(controller, makePgConnection())
}
