import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeAddEventController } from '@/main/factories/controllers'
import { auth, adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  const controller = makeAddEventController()
  router.post('/events', adminAuth, adapt(controller))
  router.get('/events/:eventId', auth, adapt(controller))
}
