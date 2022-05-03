import { Account } from '@/domain/models'

export interface LoadAccountByIdRepository {
  loadById: (params: LoadAccountByIdRepository.Params) => Promise<LoadAccountByIdRepository.Result>
}

export namespace LoadAccountByIdRepository {
  export type Params = {
    id: string
  }

  export type Result = Account | undefined
}
