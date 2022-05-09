import { makePgRoleRepository } from '@/main/factories/infra/repos'
import { AddRoleService } from '@/data/services'

export const makeAddRoleService = (): AddRoleService => {
  return new AddRoleService(makePgRoleRepository())
}
