import { LoadRolesService } from '@/data/services'
import { LoadRolesRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadRoles Service', () => {
  let sut: LoadRolesService
  let roleRepo: MockProxy<LoadRolesRepository>
  let id: string
  let name: string
  let weight: number
  let created_at: Date
  let other_id: string
  let other_name: string
  let other_weight: number
  let other_created_at: Date

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    other_id = 'other_id'
    other_name = 'other_name'
    other_weight = 2
    other_created_at = new Date()
    roleRepo = mock()
    roleRepo.load.mockResolvedValue([
      {
        id,
        name,
        weight,
        created_at
      },
      {
        id: other_id,
        name: other_name,
        weight: other_weight,
        created_at: other_created_at
      }
    ])
  })

  beforeEach(() => {
    sut = new LoadRolesService(roleRepo)
  })

  it('Should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('Should be a class', () => {
    expect(typeof LoadRolesService).toBe('function')
  })

  it('Should instantiate', () => {
    expect(sut instanceof LoadRolesService).toBe(true)
  })

  it('Should have a perform method', () => {
    expect(sut.perform).toBeDefined()
  })

  it('Should implement the perform method', () => {
    expect(typeof sut.perform).toBe('function')
  })

  describe('LoadRolesRepository', () => {
    it('Should call LoadRolesRepository once', async () => {
      await sut.perform(null)

      expect(roleRepo.load).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if LoadRolesRepository throws', async () => {
      roleRepo.load.mockRejectedValueOnce(new Error())

      const promise = sut.perform(null)

      await expect(promise).rejects.toThrow()
    })

    it('Should return an array of roles on LoadRolesRepository success', async () => {
      const result = await sut.perform(null)

      expect(result).toEqual([
        {
          id,
          name,
          weight,
          created_at: expect.any(Date)
        },
        {
          id: other_id,
          name: other_name,
          weight: other_weight,
          created_at: expect.any(Date)
        }
      ])
    })
  })
})
