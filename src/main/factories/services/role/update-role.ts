import { makePgRoleRepository } from '@/main/factories/infra/repos'
import { UpdateRoleService } from '@/data/services'

export const makeUpdateRoleService = (): UpdateRoleService => {
  return new UpdateRoleService(makePgRoleRepository())
}
