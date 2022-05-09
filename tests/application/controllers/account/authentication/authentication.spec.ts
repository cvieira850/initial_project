import { EmailValidation, EmailValidatorAdapter, RequiredValidator, StringValidator } from '@/application/validation'
import { AuthenticationController } from '@/application/controllers'
import { Authentication } from '@/domain/usecases'
import { ForbiddenError, ServerError } from '@/application/errors'

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
      new RequiredValidator(email, 'email'),
      new StringValidator(email, 'email'),
      new EmailValidation(email, 'email', new EmailValidatorAdapter()),
      new RequiredValidator(password, 'password'),
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

  it('Should return 200 if Authentication succeeds', async () => {
    const httpResponse = await sut.handle({ body: { email: 'teste@teste.com', password: 'user' } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { accessToken }
    })
  })

  it('Should return 500 if AddAccount throws', async () => {
    const error = new Error('infra_error')
    authentication.perform.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ body: { email: 'teste@teste.com', password: 'user' } })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
})
