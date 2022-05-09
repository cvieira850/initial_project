import { Role } from '@/domain/models'

export interface LoadRoles {
  perform: (params: LoadRoles.Params) => Promise<LoadRoles.Result>
}

export namespace LoadRoles {
  export type Params = null

  export type Result = Role[] | undefined
}
