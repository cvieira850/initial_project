import { AddEventService } from '@/data/services'
import { LoadEventByNameRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddEventService', () => {
  let sut: AddEventService
  let eventRepo: MockProxy<LoadEventByNameRepository>
  let name: string
  let userId: string
  let description: string

  beforeAll(() => {
    name = 'any_name'
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
  })
})
