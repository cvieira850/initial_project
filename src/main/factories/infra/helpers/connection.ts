import { PgConnection } from '@/infra/pg/helpers'

export const makePgConnection = (): PgConnection => {
  return PgConnection.getInstance()
}
