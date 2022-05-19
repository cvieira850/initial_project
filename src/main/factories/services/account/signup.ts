import { SignupService } from '@/data/services'
import { makeBcryptAdapter, makeJwtAdapter } from '@/main/factories/cryptography'
import { makePgAccountRepository } from '@/main/factories/infra/repos'
import { makeSendEmailNodeMailer } from '@/main/factories/email'

export const makeSignupService = (): SignupService => {
  return new SignupService(makePgAccountRepository(), makeBcryptAdapter(), makeJwtAdapter(), makeSendEmailNodeMailer())
}
