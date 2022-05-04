import { PgEventRepository } from '@/infra/postgres/repos'

export const makePgEventRepository = (): PgEventRepository => {
  return new PgEventRepository()
}
