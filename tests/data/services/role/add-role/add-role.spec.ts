import { AddRoleService } from '@/data/services'
import { LoadRoleByNameRepository, AddRoleRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddRoleService', () => {
  let sut: AddRoleService
  let roleRepo: MockProxy<LoadRoleByNameRepository & AddRoleRepository>
  let id: string
  let name: string
  let weight: number
  let created_at: Date

  beforeEach(() => {
    id = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
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

    it('Should return undefined if LoadRoleByNameRepository returns an event', async () => {
      roleRepo.loadByName.mockResolvedValueOnce({
        id,
        name,
        weight,
        created_at
      })

      const result = await sut.perform({ name, weight })

      expect(result).toBeUndefined()
    })

    it('Should rethrow if LoadRoleByNameRepository throws', async () => {
      roleRepo.loadByName.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ name, weight })

      await expect(promise).rejects.toThrow()
    })
  })

  describe('AddRoleRepository', () => {
    it('Should call AddRoleRepository with correct values', async () => {
      await sut.perform({ name, weight })

      expect(roleRepo.add).toHaveBeenCalledWith({ name, weight })
      expect(roleRepo.add).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if AddRoleRepository throws', async () => {
      roleRepo.add.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ name, weight })

      await expect(promise).rejects.toThrow()
    })
  })
})
