import { LoadRoleById, LoadRoleByIdRepository } from './load-role-by-id-protocols'

export class LoadRoleByIdService implements LoadRoleById {
  constructor (private readonly loadRoleByIdRepository: LoadRoleByIdRepository) {}
  async perform (params: LoadRoleById.Params): Promise<LoadRoleById.Result> {
    return await this.loadRoleByIdRepository.loadById({ id: params.id })
  }
}
