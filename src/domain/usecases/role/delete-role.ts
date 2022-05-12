import { Role } from '@/domain/models'

export interface DeleteRole {
  perform: (params: DeleteRole.Params) => Promise<DeleteRole.Result>
}

export namespace DeleteRole {
  export type Params = {
    id: string
  }

  export type Result = Role | Error | undefined
}
