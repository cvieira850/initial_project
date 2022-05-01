import { Account } from '@/domain/models'

export interface LoadAccountByTokenRepository {
  loadByToken: (params: LoadAccountByTokenRepository.Params) => Promise<LoadAccountByTokenRepository.Result>
}

export namespace LoadAccountByTokenRepository {
  export type Params = {
    accessToken: string
    role?: string
  }

  export type Result = undefined | Account
}
