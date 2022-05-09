import { LoadRoles, LoadRolesRepository } from './load-roles-protocols'

export class LoadRolesService implements LoadRoles {
  constructor (private readonly roleRepo: LoadRolesRepository) {}
  async perform (params: LoadRoles.Params): Promise<LoadRoles.Result> {
    await this.roleRepo.load(null)
    return undefined
  }
}
