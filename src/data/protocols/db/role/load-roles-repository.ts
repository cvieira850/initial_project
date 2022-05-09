import { Role } from '@/domain/models'

export interface LoadRolesRepository {
  load: (params: LoadRolesRepository.Params) => Promise<LoadRolesRepository.Result>
}

export namespace LoadRolesRepository {
  export type Params = null

  export type Result = Role[] | undefined
}
