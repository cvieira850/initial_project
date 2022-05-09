import { makePgRoleRepository } from '@/main/factories/infra/repos'
import { LoadRolesService } from '@/data/services'

export const makeLoadRolesService = (): LoadRolesService => {
  return new LoadRolesService(makePgRoleRepository())
}
