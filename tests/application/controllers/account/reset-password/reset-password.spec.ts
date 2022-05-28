import { Controller, ResetPasswordController } from '@/application/controllers'
import { CompareFieldsValidation, RequiredValidator, StringValidator } from '@/application/validation'
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
    passwordConfirmation = 'any_password_confirmation'
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

  describe('resetPassword', () => {
    it('Should call resetPassword with correct values', async () => {
      await sut.perform({ params: { token }, body: { password, passwordConfirmation } })

      expect(resetPassword.perform).toHaveBeenCalledWith({ token, password })
      expect(resetPassword.perform).toHaveBeenCalledTimes(1)
    })
  })
})
