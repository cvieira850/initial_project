import { Controller, AuthenticationController } from '@/application/controllers'
import { makeAuthenticationService } from '@/main/factories/services'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeSignInController = (): Controller => {
  const controller = new AuthenticationController(makeAuthenticationService())
  return makePgTransactionController(controller)
}
