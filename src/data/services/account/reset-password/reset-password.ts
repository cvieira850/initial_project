import { ResetPassword, LoadAccountByResetTokenRepository, Hash, UpdatePasswordRepository } from './reset-password-protocols'
import { InvalidRequestError } from '@/data/errors'

export class ResetPasswordService implements ResetPassword {
  constructor (
    private readonly accountRepo: LoadAccountByResetTokenRepository & UpdatePasswordRepository,
    private readonly hash: Hash
  ) {}

  async perform (params: ResetPassword.Params): Promise<ResetPassword.Result> {
    const account = await this.accountRepo.loadByResetToken({ token: params.token })
    if (!account) {
      throw new InvalidRequestError('Account not found')
    }
    const hashedPassword = await this.hash.hash({ plaintext: params.password })
    if (hashedPassword) {
      await this.accountRepo.updatePassword({ id: account.id, password: hashedPassword })
    }
    return undefined
  }
}
