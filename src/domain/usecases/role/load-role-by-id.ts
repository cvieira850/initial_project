import { Role } from '@/domain/models'

export interface LoadRoleById {
  perform: (params: LoadRoleById.Params) => Promise<LoadRoleById.Result>
}

export namespace LoadRoleById {
  export type Params = {
    id: string
  }

  export type Result = Role | undefined
}
