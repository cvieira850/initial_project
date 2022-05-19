import { ForgotPassword, LoadAccountByEmailRepository } from './forgot-password-protocols'

export class ForgotPasswordService implements ForgotPassword {
  constructor (private readonly accountRepo: LoadAccountByEmailRepository) {}
  async perform (params: ForgotPassword.Params): Promise<ForgotPassword.Result> {
    return await this.accountRepo.loadByEmail({ email: params.email })
  }
}
