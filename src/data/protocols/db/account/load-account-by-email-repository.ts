import { LoadAccount } from '@/domain/models'

export interface LoadAccountByEmailRepository {
  loadByEmail: (params: LoadAccountByEmailRepository.Params) => Promise<LoadAccountByEmailRepository.Result>
}

export namespace LoadAccountByEmailRepository {
  export type Params = {
    email: string
  }

  export type Result = LoadAccount | undefined
}
