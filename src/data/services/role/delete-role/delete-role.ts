import { DeleteRole, LoadRoleByIdRepository } from './delete-role-protocols'

export class DeleteRoleService implements DeleteRole {
  constructor (private readonly roleRepo: LoadRoleByIdRepository) {}
  async perform (params: DeleteRole.Params): Promise<DeleteRole.Result> {
    await this.roleRepo.loadById({ id: params.id })
    return undefined
  }
}
