import { Controller, UpdateAccountRoleController } from '@/application/controllers'
import { ServerError, UnauthorizedError } from '@/application/errors'
import { RequiredValidator, StringValidator } from '@/application/validation'
import { UpdateAccountRole } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateAccountRoleController', () => {
  let sut: UpdateAccountRoleController
  let updateAccountRole: MockProxy<UpdateAccountRole>
  let userId: string
  let roleId: string
  let role: string
  let email: string
  let name: string

  beforeAll(() => {
    userId = 'any_id'
    roleId = 'any_role_id'
    role = 'any_role'
    email = 'any_email'
    name = 'any_name'
    updateAccountRole = mock()
    updateAccountRole.perform.mockResolvedValue({
      id: userId,
      role,
      email,
      name
    })
  })

  beforeEach(() => {
    sut = new UpdateAccountRoleController(updateAccountRole)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ params: { userId }, body: { roleId } })

    expect(validators).toEqual([
      new RequiredValidator(userId, 'userId'),
      new StringValidator(userId, 'userId'),
      new RequiredValidator(roleId, 'roleId'),
      new StringValidator(roleId, 'roleId')
    ])
  })

  describe('UpdateAccountRole', () => {
    it('Should call UpdateAccountRole with correct values', async () => {
      await sut.handle({ params: { userId }, body: { roleId } })

      expect(updateAccountRole.perform).toHaveBeenCalledWith({ id: userId, roleId })
      expect(updateAccountRole.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 401 if UpdateAccountRole return undefined', async () => {
      updateAccountRole.perform.mockResolvedValueOnce(undefined)

      const httpResponse = await sut.handle({ params: { userId }, body: { roleId } })

      expect(httpResponse).toEqual({
        statusCode: 401,
        data: new UnauthorizedError()
      })
    })

    it('Should return 200 on UpdateAccountRole succeeds', async () => {
      const httpResponse = await sut.handle({ params: { userId }, body: { roleId } })

      expect(httpResponse).toEqual({
        statusCode: 200,
        data: {
          id: userId,
          name,
          role,
          email
        }
      })
    })

    it('Should rethrow if UpdateAccountRole throw', async () => {
      const error = new Error('infra_error')
      updateAccountRole.perform.mockRejectedValueOnce(error)

      const httpResponse = await sut.handle({ params: { userId }, body: { roleId } })

      expect(httpResponse).toEqual({
        statusCode: 500,
        data: new ServerError(error)
      })
    })
  })
})
