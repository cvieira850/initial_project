import { PgEventRepository } from '@/infra/pg/repos'

export const makePgEventRepository = (): PgEventRepository => {
  return new PgEventRepository()
}
