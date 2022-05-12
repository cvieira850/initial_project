import { makePgRoleRepository } from '@/main/factories/infra/repos'
import { DeleteRoleService } from '@/data/services'

export const makeDeleteRoleService = (): DeleteRoleService => {
  return new DeleteRoleService(makePgRoleRepository())
}
