import { Controller, LoadRolesController } from '@/application/controllers'
import { UnauthorizedError } from '@/application/errors'
import { LoadRoles } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadRolesController', () => {
  let sut: LoadRolesController
  let loadRoles: MockProxy<LoadRoles>
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
    loadRoles = mock()
    loadRoles.perform.mockResolvedValue([{
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
    }])
  })
  beforeEach(() => {
    sut = new LoadRolesController(loadRoles)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  describe('LoadRoles usecase', () => {
    it('Should call LoadRoles with correct values', async () => {
      await sut.handle({ body: {} })

      expect(loadRoles.perform).toHaveBeenCalledWith(null)
      expect(loadRoles.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 200 if LoadRoles succeeds', async () => {
      const httpResponse = await sut.handle({ body: { name, weight } })

      expect(httpResponse).toEqual({
        statusCode: 200,
        data: [
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
        ]
      })
    })

    it('Should return 401 if AddRole fails', async () => {
      loadRoles.perform.mockResolvedValueOnce(undefined)

      const httpResponse = await sut.handle({ body: { } })

      expect(httpResponse).toEqual({
        statusCode: 401,
        data: new UnauthorizedError()
      })
    })
  })
})
