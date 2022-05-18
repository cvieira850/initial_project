import { UpdateAccountRoleService } from '@/data/services'
import { LoadRoleByIdRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Update Account Role Usecase', () => {
  let sut: UpdateAccountRoleService
  let roleRepo: MockProxy<LoadRoleByIdRepository>
  let id: string
  let role_id: string
  let name: string
  let weight: number
  let created_at: Date

  beforeAll(() => {
    id = 'any_id'
    role_id = 'any_role_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    roleRepo = mock()
    roleRepo.loadById.mockResolvedValue({
      id: role_id,
      name,
      weight,
      created_at
    })
  })

  beforeEach(() => {
    sut = new UpdateAccountRoleService(roleRepo)
  })

  describe('LoadRoleById Repository', () => {
    it('should call LoadRoleById with correct params', async () => {
      await sut.perform({ id, roleId: role_id })

      expect(roleRepo.loadById).toHaveBeenCalledWith({ id: role_id })
      expect(roleRepo.loadById).toHaveBeenCalledTimes(1)
    })
  })
})
