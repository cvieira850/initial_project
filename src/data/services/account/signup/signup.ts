import { LoadAccountByEmailRepository, Signup, Hash, AddAccountRepository, Encrypt, UpdateAccessTokenRepository } from './signup-protocols'

export class SignupService implements Signup {
  constructor (
    private readonly accountRepo: LoadAccountByEmailRepository & AddAccountRepository & UpdateAccessTokenRepository,
    private readonly hash: Hash,
    private readonly encrypt: Encrypt
  ) {}

  public perform = async ({ email, name, password }: Signup.Params): Promise<Signup.Result> => {
    const account = await this.accountRepo.loadByEmail(email)
    if (!account) {
      const hashedPassword = await this.hash.hash({ plaintext: password })
      if (hashedPassword) {
        const accountLoaded = await this.accountRepo.add({ email, name, password: hashedPassword })
        if (accountLoaded) {
          const accessToken = await this.encrypt.encrypt({ plaintext: accountLoaded.id })
          const updatedAccount = await this.accountRepo.updateAccessToken({ id: accountLoaded.id, accessToken })
          if (updatedAccount) {
            return {
              accessToken
            }
          }
        }
      }
    }
    return undefined
  }
}
