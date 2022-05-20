import { Account } from '@/domain/models'

export interface UpdateResetPasswordTokenRepository {
  updateResetPasswordToken: (params: UpdateResetPasswordTokenRepository.Params) => Promise<UpdateResetPasswordTokenRepository.Result>
}

export namespace UpdateResetPasswordTokenRepository {
  export type Params = {
    id: string
    token: string
  }

  export type Result = Account | undefined
}
