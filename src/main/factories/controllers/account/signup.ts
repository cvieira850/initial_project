import { Controller, SignupController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/decorators'
import { makeSignupService } from '@/main/factories/services'

export const makeSignupController = (): Controller => {
  const controller = new SignupController(makeSignupService())
  return makePgTransactionController(controller)
}
