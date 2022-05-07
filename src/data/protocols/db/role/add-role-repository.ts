import { Role } from '@/domain/models'

export interface AddRoleRepository {
  add: (params: AddRoleRepository.Params) => Promise<AddRoleRepository.Result>
}

export namespace AddRoleRepository {
  export type Params = {
    name: string
    weight: number
  }

  export type Result = Role | undefined
}
