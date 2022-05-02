import { Account } from '@/domain/models'

export interface LoadAccountById {
  perform: (params: LoadAccountById.Params) => Promise<LoadAccountById.Result>
}

export namespace LoadAccountById {
  export type Params = {
    accessToken: string
  }

  export type Result = Account | undefined
}
