import { makeJwtAdapter } from '@/main/factories/cryptography'
import { makePgAccountRepository } from '@/main/factories/infra/repos'
import { LoadAccountByTokenService } from '@/data/services/account/load-account-by-token'

export const makeLoadAccountByTokenService = (): LoadAccountByTokenService => {
  return new LoadAccountByTokenService(makeJwtAdapter(), makePgAccountRepository())
}
