import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeResetPasswordController, makeLoadUserByIdController, makeUpdateAccountRoleController, makeForgotPasswordController } from '@/main/factories/controllers'
import { auth, sysAdminAuth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  const controller = makeLoadUserByIdController()
  const updateAccountRoleController = makeUpdateAccountRoleController()
  const forgotPasswordController = makeForgotPasswordController()
  const resetPasswordController = makeResetPasswordController()
  const isProd = process.env.NODE_ENV === 'production'
  router.get('/users/:userId', auth, adapt(controller))
  if (isProd) {
    router.put('/users/:userId/role', sysAdminAuth, adapt(updateAccountRoleController))
  } else {
    router.put('/users/:userId/role', adapt(updateAccountRoleController))
  }
  router.post('/users/forgot-password', adapt(forgotPasswordController))
  router.post('/users/reset-password/:token', adapt(resetPasswordController))
}
