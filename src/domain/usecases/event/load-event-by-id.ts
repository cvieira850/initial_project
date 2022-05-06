import { Event } from '@/domain/models'

export interface LoadEventById {
  perform: (params: LoadEventById.Params) => Promise<LoadEventById.Result>
}

export namespace LoadEventById {
  export type Params = {
    id: string
  }

  export type Result = Event | undefined
}
