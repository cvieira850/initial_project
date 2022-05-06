import { LoadEventByIdService } from '@/data/services'
import { LoadEventByIdRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadEventByIdService', () => {
  let sut: LoadEventByIdService
  let loadEventByIdRepository: MockProxy<LoadEventByIdRepository>
  let id: string

  beforeAll(() => {
    id = 'any_id'
    loadEventByIdRepository = mock()
    loadEventByIdRepository.loadById.mockResolvedValue({
      id,
      name: 'any_name',
      description: 'any_description',
      user_id: 'any_id',
      created_at: new Date()

    })
  })

  beforeEach(() => {
    sut = new LoadEventByIdService(loadEventByIdRepository)
  })

  it('Should call LoadEventByIdRepository with correct Id', async () => {
    await sut.perform({ id })

    expect(loadEventByIdRepository.loadById).toHaveBeenCalledWith({ id })
    expect(loadEventByIdRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if LoadEventByIdRepository throws', async () => {
    loadEventByIdRepository.loadById.mockRejectedValueOnce(new Error())

    const promise = sut.perform({ id })

    await expect(promise).rejects.toThrow(new Error())
  })
})
