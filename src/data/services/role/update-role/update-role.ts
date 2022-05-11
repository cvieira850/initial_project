import { UpdateRole, LoadRoleByIdRepository } from './update-role-protocols'

export class UpdateRoleService implements UpdateRole {
  constructor (private readonly roleRepo: LoadRoleByIdRepository) {}
  async perform (params: UpdateRole.Params): Promise<UpdateRole.Result> {
    await this.roleRepo.loadById({ id: params.id })
    return undefined
  }
}
