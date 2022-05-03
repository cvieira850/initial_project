import { LoadEventByNameRepository, AddEvent } from './add-event-protocols'

export class AddEventService implements AddEvent {
  constructor (
    private readonly loadEventByNameRepository: LoadEventByNameRepository
  ) {}

  async perform (params: AddEvent.Params): Promise<AddEvent.Result> {
    await this.loadEventByNameRepository.loadByName({ name: params.name, userId: params.userId })
    return undefined
  }
}
