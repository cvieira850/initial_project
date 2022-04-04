import { LoadAccountByEmailRepository, Signup, Hash } from './signup-protocols'

export class SignupService implements Signup {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hash: Hash
  ) {}

  public perform = async ({ email }: Signup.Params): Promise<Signup.Result> => {
    await this.loadAccountByEmailRepository.loadByEmail(email)
    await this.hash.hash({ plaintext: 'any_password' })
    return undefined
  }
}
