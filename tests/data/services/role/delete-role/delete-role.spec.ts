import { DeleteRoleService } from '@/data/services'
import { LoadRoleByIdRepository, DeleteRoleRepository } from '@/data/protocols/db'
import { InvalidRequestError } from '@/data/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeleteRoleService', () => {
  let sut: DeleteRoleService
  let roleRepo: MockProxy<LoadRoleByIdRepository & DeleteRoleRepository>
  let id: string
  let name: string
  let weight: number
  let created_at: Date

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    roleRepo = mock()
    roleRepo.loadById.mockResolvedValue({
      id,
      name,
      weight,
      created_at
    })
    roleRepo.delete.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new DeleteRoleService(roleRepo)
  })

  describe('LoadRoleByIdRepository', () => {
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

  describe('DeleteRoleRepository', () => {
    it('Should call DeleteRoleRepository with correct id', async () => {
      await sut.perform({ id })

      expect(roleRepo.delete).toHaveBeenCalledWith({ id })
      expect(roleRepo.delete).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if DeleteRoleRepository throws', async () => {
      roleRepo.delete.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ id })

      await expect(promise).rejects.toThrow(new Error())
    })
  })
})
