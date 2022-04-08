import { SignupService } from '@/data/services'
import { makeBcryptAdapter, makeJwtAdapter } from '@/main/factories/cryptography'
import { makePgAccountRepository } from '@/main/factories/infra/repos'

export const makeSignupService = (): SignupService => {
  return new SignupService(makePgAccountRepository(), makeBcryptAdapter(), makeJwtAdapter())
}
