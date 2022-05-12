import { DeleteRole, DeleteRoleRepository, LoadRoleByIdRepository } from './delete-role-protocols'
import { InvalidRequestError } from '@/data/errors'

export class DeleteRoleService implements DeleteRole {
  constructor (private readonly roleRepo: LoadRoleByIdRepository & DeleteRoleRepository) {}
  async perform (params: DeleteRole.Params): Promise<DeleteRole.Result> {
    const role = await this.roleRepo.loadById({ id: params.id })
    if (!role) {
      throw new InvalidRequestError('Role not found')
    }
    await this.roleRepo.delete({ id: params.id })
    return undefined
  }
}
