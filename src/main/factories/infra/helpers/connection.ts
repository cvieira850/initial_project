import { PgConnection } from '@/infra/postgres/helpers'

export const makePgConnection = (): PgConnection => {
  return PgConnection.getInstance()
}
