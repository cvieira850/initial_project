import { Event } from '@/domain/models'

export interface AddEventRepository {
  add: (params: AddEventRepository.Params) => Promise<AddEventRepository.Result>
}

export namespace AddEventRepository {
  export type Params = {
    name: string
    userId: string
    description: string
  }

  export type Result = Event | undefined
}
