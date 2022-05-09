import { AddRoleController, Controller } from '@/application/controllers'
import { AddRole } from '@/domain/usecases'
import { NumberValidator, RequiredValidator, StringValidator } from '@/application/validation'
import { UnauthorizedError } from '@/application/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddRoleController', () => {
  let sut: AddRoleController
  let addRole: MockProxy<AddRole>
  let id: string
  let name: string
  let weight: number
  let created_at: Date

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    addRole = mock()
    addRole.perform.mockResolvedValue({
      id,
      name,
      weight,
      created_at
    })
  })

  beforeEach(async () => {
    sut = new AddRoleController(addRole)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({
      body: { name, weight }
    })

    expect(validators).toEqual([
      new RequiredValidator(name, 'name'),
      new StringValidator(name, 'name'),
      new RequiredValidator(weight, 'weight'),
      new NumberValidator(weight, 'weight')
    ])
  })

  describe('Add Role usecase', () => {
    it('Should call AddRole with correct values', async () => {
      await sut.handle({ body: { name, weight } })

      expect(addRole.perform).toHaveBeenCalledWith({ name, weight })
      expect(addRole.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 200 if AddRole succeeds', async () => {
      const httpResponse = await sut.handle({ body: { name, weight } })

      expect(httpResponse).toEqual({
        statusCode: 200,
        data: {
          id,
          name,
          weight,
          created_at: expect.any(Date)
        }
      })
    })

    it('Should return 401 if AddRole fails', async () => {
      addRole.perform.mockResolvedValueOnce(undefined)

      const httpResponse = await sut.handle({ body: { name, weight } })

      expect(httpResponse).toEqual({
        statusCode: 401,
        data: new UnauthorizedError()
      })
    })
  })
})
