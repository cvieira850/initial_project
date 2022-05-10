import { LoadRoleById } from './load-role-by-id-protocols'

export class LoadRoleByIdService implements LoadRoleById {
  async perform (params: LoadRoleById.Params): Promise<LoadRoleById.Result> {
    return undefined
  }
}
