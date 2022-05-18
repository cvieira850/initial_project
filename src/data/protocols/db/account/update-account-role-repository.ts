import { Account } from '@/domain/models'

export interface UpdateAccountRoleRepository {
  updateAccountRole: (params: UpdateAccountRoleRepository.Params) => Promise<UpdateAccountRoleRepository.Result>
}

export namespace UpdateAccountRoleRepository {
  export type Params = {
    id: string
    roleId: string
  }

  export type Result = Account | undefined
}
