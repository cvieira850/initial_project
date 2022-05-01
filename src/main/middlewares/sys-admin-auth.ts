import { adaptExpressMiddleware } from '@/main/adapters/express-middleware'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware'

export const sysAdminAuth = adaptExpressMiddleware(makeAuthMiddleware('sysAdmin'))
