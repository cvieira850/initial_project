import { Controller, LoadRoleByIdController } from '@/application/controllers'
import { RequiredValidator, StringValidator } from '@/application/validation'
import { LoadRoleById } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadRoleByIdController', () => {
  let sut: LoadRoleByIdController
  let loadRoleById: MockProxy<LoadRoleById>
  let roleId: string
  let name: string
  let weight: number
  let created_at: Date

  beforeAll(() => {
    roleId = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    loadRoleById = mock()
    loadRoleById.perform.mockResolvedValue({
      id: roleId,
      name,
      weight,
      created_at
    })
  })
  beforeEach(() => {
    sut = new LoadRoleByIdController(loadRoleById)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ params: { roleId } })

    expect(validators).toEqual([
      new RequiredValidator(roleId, 'roleId'),
      new StringValidator(roleId, 'roleId')
    ])
  })

  describe('LoaRoleById', () => {
    it('Should call LoaRoleById with correct id', async () => {
      await sut.handle({ params: { roleId } })

      expect(loadRoleById.perform).toHaveBeenCalledWith({ id: roleId })
      expect(loadRoleById.perform).toHaveBeenCalledTimes(1)
    })
  })

  it('Should return 201 if LoaRoleById fails', async () => {
    loadRoleById.perform.mockResolvedValueOnce(undefined)

    const httpResponse = await sut.handle({ params: { roleId } })

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: null
    })
  })

  it('Should return 200 if LoaRoleById succeeds', async () => {
    const httpResponse = await sut.handle({ params: { roleId } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id: roleId,
        name,
        weight,
        created_at: expect.any(Date)
      }
    })
  })
})
