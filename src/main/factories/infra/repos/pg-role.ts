import { PgRoleRepository } from '@/infra/postgres/repos'

export const makePgRoleRepository = (): PgRoleRepository => {
  return new PgRoleRepository()
}
