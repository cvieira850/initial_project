import { UpdateAccountRole, LoadRoleByIdRepository, LoadAccountByIdRepository, UpdateAccountRoleRepository } from './update-account-role-protocols'

export class UpdateAccountRoleService implements UpdateAccountRole {
  constructor (
    private readonly roleRepo: LoadRoleByIdRepository,
    private readonly accountRepo: LoadAccountByIdRepository & UpdateAccountRoleRepository
  ) {}

  async perform (params: UpdateAccountRole.Params): Promise<UpdateAccountRole.Result> {
    const role = await this.roleRepo.loadById({ id: params.roleId })
    if (role) {
      const user = await this.accountRepo.loadById({ id: params.id })
      if (user) {
        await this.accountRepo.updateAccountRole({ id: params.id, roleId: params.roleId })
      }
    }
    return undefined
  }
}
