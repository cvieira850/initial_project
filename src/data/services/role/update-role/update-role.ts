import { InvalidRequestError } from '@/data/errors'
import { UpdateRole, LoadRoleByIdRepository } from './update-role-protocols'

export class UpdateRoleService implements UpdateRole {
  constructor (private readonly roleRepo: LoadRoleByIdRepository) {}
  async perform (params: UpdateRole.Params): Promise<UpdateRole.Result> {
    const role = await this.roleRepo.loadById({ id: params.id })
    if (!role) {
      throw new InvalidRequestError('Role not found')
    }
    return undefined
  }
}
