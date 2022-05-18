import { UpdateAccountRole, LoadRoleByIdRepository, LoadAccountByIdRepository } from './update-account-role-protocols'

export class UpdateAccountRoleService implements UpdateAccountRole {
  constructor (
    private readonly roleRepo: LoadRoleByIdRepository,
    private readonly accountRepo: LoadAccountByIdRepository
  ) {}

  async perform (params: UpdateAccountRole.Params): Promise<UpdateAccountRole.Result> {
    const role = await this.roleRepo.loadById({ id: params.roleId })
    if (role) {
      await this.accountRepo.loadById({ id: params.id })
    }
    return undefined
  }
}
