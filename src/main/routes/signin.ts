import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeSignInController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  const controller = makeSignInController()
  router.post('/signin', adapt(controller))
}
