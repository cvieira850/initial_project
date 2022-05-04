import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeAddEventController } from '@/main/factories/controllers'
import { adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  const controller = makeAddEventController()
  router.post('/event', adminAuth, adapt(controller))
}
