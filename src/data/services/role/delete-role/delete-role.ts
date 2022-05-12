import { DeleteRole, LoadRoleByIdRepository } from './delete-role-protocols'
import { InvalidRequestError } from '@/data/errors'

export class DeleteRoleService implements DeleteRole {
  constructor (private readonly roleRepo: LoadRoleByIdRepository) {}
  async perform (params: DeleteRole.Params): Promise<DeleteRole.Result> {
    const role = await this.roleRepo.loadById({ id: params.id })
    if (!role) {
      throw new InvalidRequestError('Role not found')
    }
    return undefined
  }
}
