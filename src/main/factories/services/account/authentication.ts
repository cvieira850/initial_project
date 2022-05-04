import { AuthenticationService } from '@/data/services'
import { makeBcryptAdapter, makeJwtAdapter } from '@/main/factories/cryptography'
import { makePgAccountRepository } from '@/main/factories/infra/repos'

export const makeAuthenticationService = (): AuthenticationService => {
  return new AuthenticationService(makePgAccountRepository(), makeBcryptAdapter(), makeJwtAdapter())
}
