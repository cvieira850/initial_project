import { Event } from '@/domain/models'

export interface LoadEventByNameRepository {
  loadByName: (params: LoadEventByNameRepository.Params) => Promise<LoadEventByNameRepository.Result>
}

export namespace LoadEventByNameRepository {
  export type Params = {
    name: string
    userId: string
  }

  export type Result = undefined | Event
}
