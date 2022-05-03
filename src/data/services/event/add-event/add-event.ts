import { LoadEventByNameRepository, AddEvent, AddEventRepository } from './add-event-protocols'

export class AddEventService implements AddEvent {
  constructor (
    private readonly eventRepo: LoadEventByNameRepository & AddEventRepository
  ) {}

  async perform (params: AddEvent.Params): Promise<AddEvent.Result> {
    const event = await this.eventRepo.loadByName({ name: params.name, userId: params.userId })
    if (!event) {
      return await this.eventRepo.add({
        name: params.name,
        userId: params.userId,
        description: params.description
      })
    }
    return undefined
  }
}
