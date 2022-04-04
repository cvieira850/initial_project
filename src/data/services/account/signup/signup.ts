import { LoadAccountByEmailRepository, Signup, Hash, AddAccountRepository } from './signup-protocols'

export class SignupService implements Signup {
  constructor (
    private readonly accountRepo: LoadAccountByEmailRepository & AddAccountRepository,
    private readonly hash: Hash
  ) {}

  public perform = async ({ email, name, password }: Signup.Params): Promise<Signup.Result> => {
    await this.accountRepo.loadByEmail(email)
    const hashedPassword = await this.hash.hash({ plaintext: password })
    await this.accountRepo.add({ email, name, password: hashedPassword })
    return undefined
  }
}
