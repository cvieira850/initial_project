import { AddEventService } from '@/data/services'
import { LoadEventByNameRepository, AddEventRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddEventService', () => {
  let sut: AddEventService
  let eventRepo: MockProxy<LoadEventByNameRepository & AddEventRepository>
  let id: string
  let name: string
  let userId: string
  let description: string

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    description = 'any_description'
    userId = 'any_user_id'
    eventRepo = mock()
    eventRepo.loadByName.mockResolvedValue(undefined)
    eventRepo.add.mockResolvedValue({
      id,
      name,
      user_id: userId,
      description,
      created_at: new Date()
    })
  })

  beforeEach(() => {
    sut = new AddEventService(eventRepo)
  })

  describe('LoadEventByNameRepository', () => {
    it('Should call LoadEventByNameRepository with correct values', async () => {
      await sut.perform({ name, userId, description })

      expect(eventRepo.loadByName).toHaveBeenCalledWith({ name, userId })
      expect(eventRepo.loadByName).toHaveBeenCalledTimes(1)
    })

    it('Should return undefined if LoadEventByNameRepository returns an event', async () => {
      eventRepo.loadByName.mockResolvedValueOnce({
        id,
        name,
        description,
        user_id: userId,
        created_at: new Date()
      })

      const result = await sut.perform({ name, userId, description })

      expect(result).toBeUndefined()
    })

    it('Should rethrow if LoadEventByNameRepository throws', async () => {
      eventRepo.loadByName.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ name, userId, description })

      await expect(promise).rejects.toThrow()
    })
  })

  describe('AddEventRepository', () => {
    it('Should call AddEventRepository with correct values', async () => {
      await sut.perform({ name, userId, description })

      expect(eventRepo.add).toHaveBeenCalledWith({ name, userId, description })
      expect(eventRepo.add).toHaveBeenCalledTimes(1)
    })

    it('Should return an event on success', async () => {
      const result = await sut.perform({ name, userId, description })

      expect(result).toEqual({
        id,
        name,
        description,
        user_id: userId,
        created_at: expect.any(Date)
      })
    })

    it('Should rethrow if AddEventRepository throws', async () => {
      eventRepo.add.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ name, userId, description })

      await expect(promise).rejects.toThrow()
    })
  })
})
