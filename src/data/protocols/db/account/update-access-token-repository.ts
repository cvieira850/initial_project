import { Account } from '@/domain/models'

export interface UpdateAccessTokenRepository {
  updateAccessToken: (params: UpdateAccessTokenRepository.Params) => Promise<UpdateAccessTokenRepository.Result>
}

export namespace UpdateAccessTokenRepository {
  export type Params = {
    id: string
    accessToken: string
  }

  export type Result = undefined | Account
}
