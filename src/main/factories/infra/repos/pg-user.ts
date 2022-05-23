import { PgAccountRepository } from '@/infra/pg/repos'

export const makePgAccountRepository = (): PgAccountRepository => {
  return new PgAccountRepository()
}
