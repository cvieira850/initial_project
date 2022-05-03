import { makeLoadAccountByTokenService } from '@/main/factories/services'
import { AuthMiddleware, Middleware } from '@/application/middlewares'
import { makePgTransactionMiddleware } from '../decorators'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const middleware = new AuthMiddleware(makeLoadAccountByTokenService(), role)
  return makePgTransactionMiddleware(middleware)
}
