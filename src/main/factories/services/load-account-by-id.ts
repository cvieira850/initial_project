import { makePgAccountRepository } from '@/main/factories/infra/repos'
import { LoadAccountByIdService } from '@/data/services'

export const makeLoadAccountByIdService = (): LoadAccountByIdService => {
  return new LoadAccountByIdService(makePgAccountRepository())
}
