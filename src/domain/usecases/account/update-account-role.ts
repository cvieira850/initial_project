import { Account } from '@/domain/models'

export interface UpdateAccountRole {
  perform: (params: UpdateAccountRole.Params) => Promise<UpdateAccountRole.Result>
}

export namespace UpdateAccountRole {
  export type Params = {
    id: string
    roleId: string
  }

  export type Result = Account | undefined
}
