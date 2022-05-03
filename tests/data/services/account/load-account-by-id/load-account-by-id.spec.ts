import { LoadAccountByIdService } from '@/data/services'
import { LoadAccountByIdRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadAccountByIdService', () => {
  let sut: LoadAccountByIdService
  let loadAccountByIdRepository: MockProxy<LoadAccountByIdRepository>
  let id: string

  beforeAll(() => {
    id = 'any_id'
    loadAccountByIdRepository = mock()
    loadAccountByIdRepository.loadById.mockResolvedValue({
      id,
      name: 'any_name',
      email: 'any_email',
      role: 'any_role'
    })
  })

  beforeEach(() => {
    sut = new LoadAccountByIdService(loadAccountByIdRepository)
  })
  it('Should call LoadAccountByIdRepository with correct Id', async () => {
    await sut.perform({ id })

    expect(loadAccountByIdRepository.loadById).toHaveBeenCalledWith({ id })
    expect(loadAccountByIdRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
