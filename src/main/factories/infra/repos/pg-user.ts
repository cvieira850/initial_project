import { PgAccountRepository } from '@/infra/postgres/repos'

export const makePgAccountRepository = (): PgAccountRepository => {
  return new PgAccountRepository()
}
