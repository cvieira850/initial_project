import { Authentication, LoadAccountByEmailRepository, UpdateAccessTokenRepository, HashComparer, Encrypt } from './authentication-protocols'

export class AuthenticationService implements Authentication {
  constructor (
    private readonly accountRepo: LoadAccountByEmailRepository & UpdateAccessTokenRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypt: Encrypt
  ) {}

  async perform (params: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.accountRepo.loadByEmail({ email: params.email })
    if (account !== undefined) {
      const isValid = await this.hashComparer.compare({ plaintext: params.password, digest: account.password })
      if (isValid) {
        const accessToken = await this.encrypt.encrypt({ plaintext: account.id })
        const accountUpdated = await this.accountRepo.updateAccessToken({ id: account.id, accessToken })
        if (accountUpdated !== undefined) {
          return { accessToken }
        }
      }
    }
    return undefined
  }
}
