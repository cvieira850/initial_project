import { makePgRoleRepository } from '@/main/factories/infra/repos'
import { LoadRoleByIdService } from '@/data/services'

export const makeLoadRoleByIdService = (): LoadRoleByIdService => {
  return new LoadRoleByIdService(makePgRoleRepository())
}
