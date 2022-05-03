import { Event } from '@/domain/models'

export interface AddEvent {
  perform: (params: AddEvent.Params) => Promise<AddEvent.Result>
}

export namespace AddEvent {
  export type Params = {
    name: string
    description: string
    userId: string
  }

  export type Result = Event | undefined
}
