import { Controller, ResetPasswordController } from '@/application/controllers'
import { ServerError, UnauthorizedError } from '@/application/errors'
import { CompareFieldsValidation, RequiredValidator, StringValidator } from '@/application/validation'
import { InvalidRequestError } from '@/data/errors'
import { ResetPassword } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('ResetPasswordController', () => {
  let sut: ResetPasswordController
  let resetPassword: MockProxy<ResetPassword>
  let token: string
  let password: string
  let passwordConfirmation: string
  let id: string
  let name: string
  let email: string

  beforeAll(() => {
    token = 'any_token'
    password = 'any_password'
    passwordConfirmation = 'any_password'
    id = 'any_id'
    name = 'any_name'
    email = 'any_email'
    resetPassword = mock()
    resetPassword.perform.mockResolvedValue({
      id,
      name,
      email
    })
  })

  beforeEach(() => {
    sut = new ResetPasswordController(resetPassword)
  })

  it('Should be an instance of Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ params: { token }, body: { password, passwordConfirmation } })

    expect(validators).toEqual([
      new RequiredValidator(token, 'token'),
      new StringValidator(token, 'token'),
      new RequiredValidator(password, 'password'),
      new StringValidator(password, 'password'),
      new RequiredValidator(passwordConfirmation, 'passwordConfirmation'),
      new StringValidator(passwordConfirmation, 'passwordConfirmation'),
      new CompareFieldsValidation(password, 'passwordConfirmation', passwordConfirmation)
    ])
  })

  describe('ResetPassword', () => {
    it('Should call ResetPassword with correct values', async () => {
      await sut.perform({ params: { token }, body: { password, passwordConfirmation } })

      expect(resetPassword.perform).toHaveBeenCalledWith({ token, password })
      expect(resetPassword.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 401 if ResetPassword return undefined', async () => {
      resetPassword.perform.mockResolvedValueOnce(undefined)

      const httpResponse = await sut.handle({ params: { token }, body: { password, passwordConfirmation } })

      expect(httpResponse).toEqual({
        statusCode: 401,
        data: new UnauthorizedError()
      })
    })

    it('Should return 200 on success', async () => {
      const httpResponse = await sut.handle({ params: { token }, body: { password, passwordConfirmation } })

      expect(httpResponse).toEqual({
        statusCode: 200,
        data: {
          id,
          name,
          email
        }
      })
    })

    it('Should return 401 if ResetPassword throw invalidRequestError', async () => {
      resetPassword.perform.mockRejectedValueOnce(new InvalidRequestError('Account not found'))

      const httpResponse = await sut.handle({ params: { token }, body: { password, passwordConfirmation } })

      expect(httpResponse).toEqual({
        statusCode: 401,
        data: new UnauthorizedError()
      })
    })

    it('Should rethrow if ResetPassword throw', async () => {
      const error = new Error('infra_error')
      resetPassword.perform.mockRejectedValueOnce(error)

      const httpResponse = await sut.handle({ params: { token }, body: { password, passwordConfirmation } })

      expect(httpResponse).toEqual({
        statusCode: 500,
        data: new ServerError(error)
      })
    })
  })
})
