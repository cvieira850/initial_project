import { Role } from '@/domain/models'

export interface UpdateRoleRepository {
  update: (params: UpdateRoleRepository.Params) => Promise<UpdateRoleRepository.Result>
}

export namespace UpdateRoleRepository {
  export type Params = {
    id: string
    name?: string
    weight?: number
  }

  export type Result = Role | undefined
}
