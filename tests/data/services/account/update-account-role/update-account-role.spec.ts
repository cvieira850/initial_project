import { UpdateAccountRoleService } from '@/data/services'
import { LoadRoleByIdRepository, LoadAccountByIdRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Update Account Role Usecase', () => {
  let sut: UpdateAccountRoleService
  let roleRepo: MockProxy<LoadRoleByIdRepository>
  let accountRepo: MockProxy<LoadAccountByIdRepository>
  let id: string
  let role_id: string
  let name: string
  let weight: number
  let created_at: Date
  let name_account: string
  let email: string
  let role: string

  beforeAll(() => {
    id = 'any_id'
    role_id = 'any_role_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    name_account = 'any_name_account'
    email = 'any_email'
    role = 'any_role'
    roleRepo = mock()
    roleRepo.loadById.mockResolvedValue({
      id: role_id,
      name,
      weight,
      created_at
    })
    accountRepo = mock()
    accountRepo.loadById.mockResolvedValue({
      id,
      name: name_account,
      email,
      role
    })
  })

  beforeEach(() => {
    sut = new UpdateAccountRoleService(roleRepo, accountRepo)
  })

  describe('LoadRoleById Repository', () => {
    it('should call LoadRoleByIdRepository with correct params', async () => {
      await sut.perform({ id, roleId: role_id })

      expect(roleRepo.loadById).toHaveBeenCalledWith({ id: role_id })
      expect(roleRepo.loadById).toHaveBeenCalledTimes(1)
    })

    it('Should return undefined if LoadRoleByIdRepository dont return a role', async () => {
      roleRepo.loadById.mockResolvedValueOnce(undefined)

      const result = await sut.perform({ id, roleId: role_id })

      expect(result).toBeUndefined()
    })

    it('Should rethrow if LoadRoleByIdRepository throws', async () => {
      roleRepo.loadById.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ id, roleId: role_id })

      await expect(promise).rejects.toThrow()
    })
  })

  describe('LoadAccountById Repository', () => {
    it('should call LoadAccountByIdRepository with correct params', async () => {
      await sut.perform({ id, roleId: role_id })

      expect(accountRepo.loadById).toHaveBeenCalledWith({ id })
      expect(accountRepo.loadById).toHaveBeenCalledTimes(1)
    })
  })
})
