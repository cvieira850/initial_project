import { LoadRoles } from './load-roles-protocols'

export class LoadRolesService implements LoadRoles {
  async perform (params: LoadRoles.Params): Promise<LoadRoles.Result> {
    return undefined
  }
}
