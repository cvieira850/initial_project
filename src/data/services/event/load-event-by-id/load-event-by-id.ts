import { LoadEventById, LoadEventByIdRepository } from './load-event-by-id-protocols'

export class LoadEventByIdService implements LoadEventById {
  constructor (
    private readonly loadEventByIdRepository: LoadEventByIdRepository
  ) {}

  async perform (params: LoadEventById.Params): Promise<LoadEventById.Result> {
    return await this.loadEventByIdRepository.loadById({ id: params.id })
  }
}
