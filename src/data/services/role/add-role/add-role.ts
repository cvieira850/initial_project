import { AddRole, LoadRoleByNameRepository, AddRoleRepository } from './add-role-protocols'

export class AddRoleService implements AddRole {
  constructor (
    private readonly roleRepo: LoadRoleByNameRepository & AddRoleRepository
  ) {}

  async perform (params: AddRole.Params): Promise<AddRole.Result> {
    const role = await this.roleRepo.loadByName({ name: params.name })
    if (!role) {
      return await this.roleRepo.add({ name: params.name, weight: params.weight })
    }
  }
}
