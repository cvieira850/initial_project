import { Controller, SignupController } from '@/application/controllers'
import { makePgTransactionController } from '../decorators'
import { makeSignupService } from '../services'

export const makeSignupController = (): Controller => {
  const controller = new SignupController(makeSignupService())
  return makePgTransactionController(controller)
}
