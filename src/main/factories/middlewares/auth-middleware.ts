import { makeLoadAccountByTokenService } from '@/main/factories/services'
import { AuthMiddleware, Middleware } from '@/application/middlewares'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeLoadAccountByTokenService(), role)
}
