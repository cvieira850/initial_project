import { SignupController } from '@/application/controllers'
import { makeSignupService } from '../services'

export const makeSignupController = (): SignupController => {
  return new SignupController(makeSignupService())
}
