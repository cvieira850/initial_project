import { LoadAccountById, LoadAccountByIdRepository } from './load-account-by-id-protocols'

export class LoadAccountByIdService implements LoadAccountById {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async perform (params: LoadAccountById.Params): Promise<LoadAccountById.Result> {
    return await this.loadAccountByIdRepository.loadById({ id: params.id })
  }
}
