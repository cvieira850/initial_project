import { Account } from '@/domain/models'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<Account | undefined>
}

export namespace LoadAccountByEmailRepository {
  export type Params = {
    email: string
  }

  export type Result = Account | undefined
}
