import { Account } from '@/domain/models'

export interface UpdatePasswordRepository {
  updatePassword: (params: UpdatePasswordRepository.Params) => Promise<UpdatePasswordRepository.Result>
}

export namespace UpdatePasswordRepository {
  export type Params = {
    id: string
    password: string
  }

  export type Result = Account | undefined
}
