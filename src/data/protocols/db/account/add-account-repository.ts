import { Account } from '@/domain/models'

export interface AddAccountRepository {
  add: (account: AddAcountRepository.Params) => Promise<AddAcountRepository.Result>
}

export namespace AddAcountRepository {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = Account | undefined
}
