import { Controller, UpdateRoleController } from '@/application/controllers'
import { UnauthorizedError } from '@/application/errors'
import { NumberValidator, RequiredValidator, StringValidator } from '@/application/validation'
import { UpdateRole } from '@/domain/usecases'
import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateRole Repository', () => {
  let sut: UpdateRoleController
  let usecase: MockProxy<UpdateRole>
  let roleId: string
  let name: string
  let weight: number
  let created_at: Date

  beforeAll(() => {
    roleId = 'any_id'
    name = 'any_name'
    weight = 1
    created_at = new Date()
    usecase = mock()
    usecase.perform.mockResolvedValue({ id: roleId, name, weight, created_at })
  })

  beforeEach(() => {
    sut = new UpdateRoleController(usecase)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({
      params: { roleId },
      body: { name, weight }
    })

    expect(validators).toEqual([
      new RequiredValidator(roleId, 'roleId'),
      new StringValidator(roleId, 'roleId'),
      new RequiredValidator(name, 'name'),
      new StringValidator(name, 'name'),
      new RequiredValidator(weight, 'weight'),
      new NumberValidator(weight, 'weight')
    ])
  })

  describe('UpdateRole Usecase', () => {
    it('Should call the UpdateRole with correct params', async () => {
      await sut.handle({ params: { roleId }, body: { name, weight } })

      expect(usecase.perform).toHaveBeenCalledWith({ id: roleId, name, weight })
      expect(usecase.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 401 if UpdateRole throw nvalidRequestError', async () => {
      usecase.perform.mockResolvedValueOnce(undefined)

      const httpResponse = await sut.handle({ params: { roleId }, body: { name, weight } })

      expect(httpResponse).toEqual({
        statusCode: 401,
        data: new UnauthorizedError()
      })
    })
  })
})
