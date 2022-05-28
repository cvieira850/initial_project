import { Account } from '@/domain/models'

export interface LoadAccountByResetTokenRepository {
  loadByResetToken: (params: LoadAccountByResetTokenRepository.Params) => Promise<LoadAccountByResetTokenRepository.Result>
}

export namespace LoadAccountByResetTokenRepository {
  export type Params = {
    token: string
  }

  export type Result = Account | undefined
}
