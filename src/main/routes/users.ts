import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeLoadUserByIdController } from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  const controller = makeLoadUserByIdController()
  router.get('/users/:userId', auth, adapt(controller))
}
