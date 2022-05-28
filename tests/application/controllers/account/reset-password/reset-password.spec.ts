import { Controller, ResetPasswordController } from '@/application/controllers'
import { CompareFieldsValidation, RequiredValidator, StringValidator } from '@/application/validation'

describe('ResetPasswordController', () => {
  let sut: ResetPasswordController
  let token: string
  let password: string
  let passwordConfirmation: string

  beforeAll(() => {
    token = 'any_token'
    password = 'any_password'
    passwordConfirmation = 'any_password_confirmation'
  })

  beforeEach(() => {
    sut = new ResetPasswordController()
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
})
