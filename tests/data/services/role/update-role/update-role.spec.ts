import { UpdateRoleService } from '@/data/services'
import { LoadRoleByIdRepository, UpdateRoleRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'
import { InvalidRequestError } from '@/data/errors'

describe('UpdateRoleService', () => {
  let sut: UpdateRoleService
  let roleRepo: MockProxy<LoadRoleByIdRepository & UpdateRoleRepository>
  let id: string
  let name: string
  let weight: number
  let created_at: Date
  let new_name: string
  let new_weight: number

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    new_name = 'new_name'
    new_weight = 2
    roleRepo = mock()
    roleRepo.loadById.mockResolvedValue({
      id,
      name,
      weight,
      created_at
    })
    roleRepo.update.mockResolvedValue({
      id,
      name: new_name,
      weight: new_weight,
      created_at
    })
  })

  beforeEach(() => {
    sut = new UpdateRoleService(roleRepo)
  })

  describe('LoadRoleById Repository', () => {
    it('Should call LoadRoleByIdRepository with correct id', async () => {
      await sut.perform({ id })

      expect(roleRepo.loadById).toHaveBeenCalledWith({ id })
      expect(roleRepo.loadById).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if LoadRoleByIdRepository throws', async () => {
      roleRepo.loadById.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ id })

      await expect(promise).rejects.toThrow(new Error())
    })

    it('Should return an error if LoadRoleByIdRepository returns undefined', async () => {
      roleRepo.loadById.mockResolvedValueOnce(undefined)

      const promise = sut.perform({ id })

      await expect(promise).rejects.toThrow(new InvalidRequestError('Role not found'))
    })
  })

  describe('UpdateRoleRepository', () => {
    it('Should call UpdateRoleRepository with correct values', async () => {
      await sut.perform({ id, name, weight })

      expect(roleRepo.update).toHaveBeenCalledWith({ id, name, weight })
      expect(roleRepo.update).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if UpdateRoleRepository throws', async () => {
      roleRepo.update.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ id })

      await expect(promise).rejects.toThrow(new Error())
    })

    it('Should return undefined if UpdateRoleRepository returns undefined', async () => {
      roleRepo.update.mockResolvedValueOnce(undefined)

      const result = await sut.perform({ id })

      expect(result).toBeUndefined()
    })
  })
})
