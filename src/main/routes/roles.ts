import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeAddRoleController, makeLoadRolesController, makeLoadRoleByIdController } from '@/main/factories/controllers'
import { sysAdminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  const controller = makeAddRoleController()
  const loadRolesController = makeLoadRolesController()
  const loadRoleByIdController = makeLoadRoleByIdController()
  const isProd = process.env.NODE_ENV === 'production'
  if (isProd) {
    router.post('/roles', sysAdminAuth, adapt(controller))
    router.get('/roles', sysAdminAuth, adapt(loadRolesController))
    router.get('/roles/:roleId', sysAdminAuth, adapt(loadRoleByIdController))
  } else {
    router.post('/roles', adapt(controller))
    router.get('/roles', adapt(loadRolesController))
    router.get('/roles/:roleId', adapt(loadRoleByIdController))
  }
}
