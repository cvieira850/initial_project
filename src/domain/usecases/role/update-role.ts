import { Role } from '@/domain/models'

export interface UpdateRole {
  perform: (params: UpdateRole.Params) => Promise<UpdateRole.Result>
}

export namespace UpdateRole {
  export type Params = {
    id: string
    name?: string
    weight?: number
  }

  export type Result = Role | Error
}
