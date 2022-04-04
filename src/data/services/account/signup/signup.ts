import { LoadAccountByEmailRepository, Signup, Hash, AddAccountRepository, Encrypt } from './signup-protocols'

export class SignupService implements Signup {
  constructor (
    private readonly accountRepo: LoadAccountByEmailRepository & AddAccountRepository,
    private readonly hash: Hash,
    private readonly encrypt: Encrypt
  ) {}

  public perform = async ({ email, name, password }: Signup.Params): Promise<Signup.Result> => {
    await this.accountRepo.loadByEmail(email)
    const hashedPassword = await this.hash.hash({ plaintext: password })
    const account = await this.accountRepo.add({ email, name, password: hashedPassword })
    if (account) {
      await this.encrypt.encrypt({ plaintext: account.id })
    }
    return undefined
  }
}
