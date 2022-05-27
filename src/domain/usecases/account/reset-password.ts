import { Account } from '@/domain/models'

export interface ResetPassword {
  perform: (params: ResetPassword.Params) => Promise<ResetPassword.Result>
}

export namespace ResetPassword {
  export type Params = {
    token: string
    password: string
  }

  export type Result = Account | Error | undefined
}
