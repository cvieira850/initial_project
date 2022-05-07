import { Role } from '@/domain/models'

export interface AddRole {
  perform: (params: AddRole.Params) => Promise<AddRole.Result>
}

export namespace AddRole {
  export type Params = {
    name: string
    weight: number
  }

  export type Result = Role | undefined
}
