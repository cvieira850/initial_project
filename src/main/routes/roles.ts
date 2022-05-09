import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeAddRoleController } from '@/main/factories/controllers'
import { sysAdminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  const controller = makeAddRoleController()
  const isProd = process.env.NODE_ENV === 'production'
  if (isProd) {
    router.post('/roles', sysAdminAuth, adapt(controller))
  } else {
    router.post('/roles', adapt(controller))
  }
}
