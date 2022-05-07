import { AddRoleService } from '@/data/services'
import { LoadRoleByNameRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddRoleService', () => {
  let sut: AddRoleService
  let roleRepo: MockProxy<LoadRoleByNameRepository>
  let name: string

  beforeEach(() => {
    name = 'any_name'
    roleRepo = mock()
    roleRepo.loadByName.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new AddRoleService(roleRepo)
  })

  describe('LoadRoleByNameRepository', () => {
    it('Should call LoadRoleByNameRepository with correct values', async () => {
      await sut.perform({ name, weight: 1 })

      expect(roleRepo.loadByName).toHaveBeenCalledWith({ name })
      expect(roleRepo.loadByName).toHaveBeenCalledTimes(1)
    })
  })
})
