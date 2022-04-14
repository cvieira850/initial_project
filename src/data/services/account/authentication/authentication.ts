import { Authentication, LoadAccountByEmailRepository } from './authentication-protocols'

export class AuthenticationService implements Authentication {
  constructor (private readonly accountRepo: LoadAccountByEmailRepository) {}
  async perform (params: Authentication.Params): Promise<Authentication.Result> {
    await this.accountRepo.loadByEmail({ email: params.email })
    return undefined
  }
}
