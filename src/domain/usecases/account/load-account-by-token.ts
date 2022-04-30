import { Account } from '@/domain/models'

export interface LoadAccountByToken {
  perform: (params: LoadAccountByToken.Params) => Promise<LoadAccountByToken.Result>
}

export namespace LoadAccountByToken {
  export type Params = {
    accessToken: string
    role?: string
  }

  export type Result = Account | undefined
}
