import { makePgAccountRepository } from '@/main/factories/infra/repos'
import { ResetPasswordService } from '@/data/services'
import { makeSendEmailNodeMailer } from '@/main/factories/email'
import { makeBcryptAdapter } from '@/main/factories/cryptography'

export const makeResetPasswordService = (): ResetPasswordService => {
  return new ResetPasswordService(makePgAccountRepository(), makeBcryptAdapter(), makeSendEmailNodeMailer())
}
