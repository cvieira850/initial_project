import { Authentication, LoadAccountByEmailRepository, HashComparer, Encrypt } from './authentication-protocols'

export class AuthenticationService implements Authentication {
  constructor (
    private readonly accountRepo: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypt: Encrypt
  ) {}

  async perform (params: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.accountRepo.loadByEmail({ email: params.email })
    if (account !== undefined) {
      const isValid = await this.hashComparer.compare({ plaintext: params.password, digest: account.password })
      if (isValid) {
        await this.encrypt.encrypt({ plaintext: account.id })
      }
    }
    return undefined
  }
}
