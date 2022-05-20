import { Controller, ForgotPasswordController } from '@/application/controllers'
import { EmailValidation, EmailValidatorAdapter, RequiredValidator, StringValidator } from '@/application/validation'
import { ForgotPassword } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('ForgotPassword Controller', () => {
  let sut: ForgotPasswordController
  let forgotPassword: MockProxy<ForgotPassword>
  let id: string
  let email: string
  let password: string
  let name: string
  let role: string
  let reset_password_token: string

  beforeAll(() => {
    id = 'any_id'
    email = 'any_email'
    password = 'any_password'
    name = 'any_name'
    role = 'any_role'
    reset_password_token = 'any_reset_password_token'
    forgotPassword = mock()
    forgotPassword.perform.mockResolvedValue({
      id,
      email,
      password,
      name,
      role,
      reset_password_token
    })
  })

  beforeEach(() => {
    sut = new ForgotPasswordController(forgotPassword)
  })

  it('Should be an instance of Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ body: { email } })

    expect(validators).toEqual([
      new RequiredValidator(email, 'email'),
      new EmailValidation(email, 'email', new EmailValidatorAdapter()),
      new StringValidator(email, 'email')
    ])
  })

  describe('ForgotPassword', () => {
    it('Should call forgotPassword with correct values', async () => {
      await sut.perform({ body: { email } })

      expect(forgotPassword.perform).toHaveBeenCalledWith({ email })
      expect(forgotPassword.perform).toHaveBeenCalledTimes(1)
    })
  })
})
