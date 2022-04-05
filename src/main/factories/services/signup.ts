import { SignupService } from '@/data/services'
import { makeBcryptAdapter, makeJwtAdapter } from '@/main/factories/cryptography'
import { makePgAccountRepository } from '@/main/factories/repos'

export const makeSignupService = (): SignupService => {
  return new SignupService(makePgAccountRepository(), makeBcryptAdapter(), makeJwtAdapter())
}
