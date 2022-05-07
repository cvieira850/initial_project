/* eslint-disable @typescript-eslint/naming-convention */
import { LoadEventByIdService } from '@/data/services'
import { LoadEventByIdRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadEventByIdService', () => {
  let sut: LoadEventByIdService
  let loadEventByIdRepository: MockProxy<LoadEventByIdRepository>
  let id: string
  let name: string
  let description: string
  let user_id: string
  let created_at: Date

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    description = 'any_description'
    user_id = 'any_user_id'
    created_at = new Date()
    loadEventByIdRepository = mock()
    loadEventByIdRepository.loadById.mockResolvedValue({
      id,
      name,
      description,
      user_id,
      created_at
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

  it('Should return undefined if LoadEventByIdRepository returns undefined', async () => {
    loadEventByIdRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut.perform({ id })

    await expect(promise).resolves.toBeUndefined()
  })

  it('Should return Event on LoadEventByIdRepository success', async () => {
    const eventCreated = await sut.perform({ id })

    expect(eventCreated).toEqual({
      id,
      name,
      description,
      user_id,
      created_at: expect.any(Date)
    })
  })
})
