import { EmailValidation, EmailValidatorAdapter, RequiredStringValidator, StringValidator } from '@/application/validation'
import { AuthenticationController } from '@/application/controllers'
import { Authentication } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Authentication Controller', () => {
  let sut: AuthenticationController
  let authentication: MockProxy<Authentication>
  let email: string
  let password: string
  let accessToken: string

  beforeAll(() => {
    email = 'any_email@teste.com'
    password = 'any_password'
    accessToken = 'any_token'
    authentication = mock()
    authentication.perform.mockResolvedValue({
      accessToken
    })
  })

  beforeEach(() => {
    sut = new AuthenticationController(authentication)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ body: { email, password } })

    expect(validators).toEqual([
      new RequiredStringValidator(email, 'email'),
      new StringValidator(email, 'email'),
      new EmailValidation(email, 'email', new EmailValidatorAdapter()),
      new RequiredStringValidator(password, 'password'),
      new StringValidator(password, 'password')
    ])
  })
})