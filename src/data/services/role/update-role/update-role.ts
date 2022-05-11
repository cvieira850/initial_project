import { InvalidRequestError } from '@/data/errors'
import { UpdateRole, LoadRoleByIdRepository, UpdateRoleRepository } from './update-role-protocols'

export class UpdateRoleService implements UpdateRole {
  constructor (
    private readonly roleRepo: LoadRoleByIdRepository & UpdateRoleRepository
  ) {}

  async perform (params: UpdateRole.Params): Promise<UpdateRole.Result> {
    const role = await this.roleRepo.loadById({ id: params.id })
    if (!role) {
      throw new InvalidRequestError('Role not found')
    }
    await this.roleRepo.update({ id: params.id, name: params.name, weight: params.weight })
    return undefined
  }
}
