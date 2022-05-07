import { AddRole, LoadRoleByNameRepository } from './add-role-protocols'

export class AddRoleService implements AddRole {
  constructor (private readonly roleRepo: LoadRoleByNameRepository) {}
  async perform (params: AddRole.Params): Promise<AddRole.Result> {
    await this.roleRepo.loadByName({ name: params.name })
    return undefined
  }
}
