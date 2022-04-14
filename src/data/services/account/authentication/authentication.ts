import { Authentication, LoadAccountByEmailRepository, HashComparer } from './authentication-protocols'

export class AuthenticationService implements Authentication {
  constructor (
    private readonly accountRepo: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async perform (params: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.accountRepo.loadByEmail({ email: params.email })
    if (account !== undefined) {
      await this.hashComparer.compare({ plaintext: params.password, digest: account.password })
    }
    return undefined
  }
}
