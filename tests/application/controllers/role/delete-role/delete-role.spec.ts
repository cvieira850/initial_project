import { Controller, DeleteRoleController } from '@/application/controllers'
import { UnauthorizedError } from '@/application/errors'
import { RequiredValidator, StringValidator } from '@/application/validation'
import { InvalidRequestError } from '@/data/errors'
import { DeleteRole } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeleteRole Controller', () => {
  let sut: DeleteRoleController
  let usecase: MockProxy<DeleteRole>
  let roleId: string

  beforeAll(() => {
    roleId = 'any_id'
    usecase = mock()
    usecase.perform.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new DeleteRoleController(usecase)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({
      params: { roleId }
    })

    expect(validators).toEqual([
      new RequiredValidator(roleId, 'roleId'),
      new StringValidator(roleId, 'roleId')
    ])
  })

  describe('DeleteRole Usecase', () => {
    it('Should call the DeleteRole with correct params', async () => {
      await sut.handle({ params: { roleId } })

      expect(usecase.perform).toHaveBeenCalledWith({ id: roleId })
      expect(usecase.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 401 if DeleteRole throw invalidRequestError', async () => {
      usecase.perform.mockRejectedValueOnce(new InvalidRequestError('Role not found'))

      const httpResponse = await sut.handle({ params: { roleId } })

      expect(httpResponse).toEqual({
        statusCode: 401,
        data: new UnauthorizedError()
      })
    })

    it('Should return 201 if DeleteRole succeeds', async () => {
      const httpResponse = await sut.handle({ params: { roleId } })

      expect(httpResponse).toEqual({
        statusCode: 201,
        data: null
      })
    })
  })
})
