import { UpdateAccountRole, LoadRoleByIdRepository } from './update-account-role-protocols'

export class UpdateAccountRoleService implements UpdateAccountRole {
  constructor (private readonly roleRepo: LoadRoleByIdRepository) {}
  async perform (params: UpdateAccountRole.Params): Promise<UpdateAccountRole.Result> {
    await this.roleRepo.loadById({ id: params.roleId })
    return undefined
  }
}
