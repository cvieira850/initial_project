import { Role } from '@/domain/models'

export interface LoadRoleByNameRepository {
  loadByName: (params: LoadRoleByNameRepository.Params) => Promise<LoadRoleByNameRepository.Result>
}

export namespace LoadRoleByNameRepository {
  export type Params = {
    name: string
  }

  export type Result = Role | undefined
}
