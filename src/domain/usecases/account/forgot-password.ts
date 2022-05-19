import { Account } from '@/domain/models'

export interface ForgotPassword {
  perform: (params: ForgotPassword.Params) => Promise<ForgotPassword.Result>
}

export namespace ForgotPassword {
  export type Params = {
    email: string
  }

  export type Result = Account | undefined
}
