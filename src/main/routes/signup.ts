import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeSignupController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  const controller = makeSignupController()
  router.post('/signup', adapt(controller))
}
