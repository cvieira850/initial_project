import { Event } from '@/domain/models'

export interface LoadEventByIdRepository {
  loadById: (params: LoadEventByIdRepository.Params) => Promise<LoadEventByIdRepository.Result>
}

export namespace LoadEventByIdRepository{
  export type Params = {
    id: string
  }

  export type Result = Event | undefined
}
