import { ResetPassword, LoadAccountByResetTokenRepository } from './reset-password-protocols'

export class ResetPasswordService implements ResetPassword {
  constructor (private readonly accountRepo: LoadAccountByResetTokenRepository) {}
  async perform (params: ResetPassword.Params): Promise<ResetPassword.Result> {
    await this.accountRepo.loadByResetToken({ token: params.token })
    return undefined
  }
}
