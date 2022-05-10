import { Role } from '@/domain/models'

export interface LoadRoleByIdRepository {
  loadById: (params: LoadRoleByIdRepository.Params) => Promise<LoadRoleByIdRepository.Result>
}

export namespace LoadRoleByIdRepository {
  export type Params = {
    id: string
  }

  export type Result = Role | undefined
}
