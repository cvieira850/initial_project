import { PgRoleRepository } from '@/infra/pg/repos'

export const makePgRoleRepository = (): PgRoleRepository => {
  return new PgRoleRepository()
}
