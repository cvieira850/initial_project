import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeMeController } from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  const controller = makeMeController()
  router.get('/me', auth, adapt(controller))
}
