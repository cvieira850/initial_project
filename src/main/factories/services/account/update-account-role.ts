import { makePgAccountRepository, makePgRoleRepository } from '@/main/factories/infra/repos'
import { UpdateAccountRoleService } from '@/data/services'

export const makeUpdateAccountRoleService = (): UpdateAccountRoleService => {
  return new UpdateAccountRoleService(makePgRoleRepository(), makePgAccountRepository())
}
