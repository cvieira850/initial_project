import { makePgAccountRepository } from '@/main/factories/infra/repos'
import { ForgotPasswordService } from '@/data/services'
import { makeSendEmailNodeMailer } from '@/main/factories/email'
import { makeJwtAdapter } from '@/main/factories/cryptography'

export const makeForgotPasswordService = (): ForgotPasswordService => {
  return new ForgotPasswordService(makePgAccountRepository(), makeSendEmailNodeMailer(), makeJwtAdapter())
}
