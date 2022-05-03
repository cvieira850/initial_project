import { AddEventService } from '@/data/services'
import { LoadEventByNameRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddEventService', () => {
  let sut: AddEventService
  let eventRepo: MockProxy<LoadEventByNameRepository>
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
  })

  beforeEach(() => {
    sut = new AddEventService(eventRepo)
  })

  describe('LoadEventByNameRepository Repository', () => {
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
  })
})
