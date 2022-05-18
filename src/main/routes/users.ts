import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeLoadUserByIdController, makeUpdateAccountRoleController } from '@/main/factories/controllers'
import { auth, sysAdminAuth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  const controller = makeLoadUserByIdController()
  const updateAccountRolecontroller = makeUpdateAccountRoleController()
  const isProd = process.env.NODE_ENV === 'production'
  router.get('/users/:userId', auth, adapt(controller))
  if (isProd) {
    router.put('/users/:userId/role', sysAdminAuth, adapt(updateAccountRolecontroller))
  } else {
    router.put('/users/:userId/role', adapt(updateAccountRolecontroller))
  }
}
