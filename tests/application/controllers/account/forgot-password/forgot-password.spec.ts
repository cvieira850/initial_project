import { Controller, ForgotPasswordController } from '@/application/controllers'
import { EmailValidation, EmailValidatorAdapter, RequiredValidator, StringValidator } from '@/application/validation'

describe('ForgotPassword Controller', () => {
  let sut: ForgotPasswordController
  let email: string

  beforeEach(() => {
    email = 'any_email'
    sut = new ForgotPasswordController()
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
})
