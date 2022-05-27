import { ResetPassword, LoadAccountByResetTokenRepository } from './reset-password-protocols'
import { InvalidRequestError } from '@/data/errors'

export class ResetPasswordService implements ResetPassword {
  constructor (private readonly accountRepo: LoadAccountByResetTokenRepository) {}
  async perform (params: ResetPassword.Params): Promise<ResetPassword.Result> {
    const account = await this.accountRepo.loadByResetToken({ token: params.token })
    if (!account) {
      throw new InvalidRequestError('Account not found')
    }
    return undefined
  }
}
