import { LoadAccountByEmailRepository, Signup } from './signup-protocols'

export class SignupService implements Signup {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}
  public perform = async ({ email }: Signup.Params): Promise<Signup.Result> => {
    await this.loadAccountByEmailRepository.loadByEmail(email)

    return undefined
  }
}
