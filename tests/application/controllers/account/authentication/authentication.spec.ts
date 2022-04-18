import { EmailValidation, EmailValidatorAdapter, RequiredStringValidator, StringValidator } from '@/application/validation'
import { AuthenticationController } from '@/application/controllers'
import { Authentication } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'
import { ForbiddenError } from '@/application/errors'

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

  it('Should call Authentication with correct values', async () => {
    await sut.handle({ body: { email: 'teste@teste.com', password: 'user' } })

    expect(authentication.perform).toHaveBeenCalledWith({ email: 'teste@teste.com', password: 'user' })
    expect(authentication.perform).toHaveBeenCalledTimes(1)
  })

  it('Should return 403 if Authentication fails', async () => {
    authentication.perform.mockResolvedValueOnce(undefined)

    const httpResponse = await sut.handle({ body: { email: 'teste@teste.com', password: 'user' } })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })
})
