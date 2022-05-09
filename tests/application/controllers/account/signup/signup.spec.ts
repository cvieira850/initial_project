import { SignupController, Controller } from '@/application/controllers'
import { ServerError, UnauthorizedError } from '@/application/errors'
import { CompareFieldsValidation, EmailValidation, EmailValidatorAdapter, RequiredValidator, StringValidator } from '@/application/validation'
import { Signup } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('SignupController', () => {
  let sut: SignupController
  let signup: MockProxy<Signup>
  let email: string
  let name: string
  let password: string
  let passwordConfirmation: string
  let accessToken: string

  beforeAll(() => {
    email = 'teste@teste.com'
    name = 'any_name'
    password = 'any_password'
    passwordConfirmation = 'any_password'
    accessToken = 'any_token'
    signup = mock()
    signup.perform.mockResolvedValue({
      accessToken
    })
  })
  beforeEach(() => {
    sut = new SignupController(signup)
  })
  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ body: { email, name, password, passwordConfirmation } })

    expect(validators).toEqual([
      new RequiredValidator(email, 'email'),
      new EmailValidation(email, 'email', new EmailValidatorAdapter()),
      new StringValidator(email, 'email'),
      new RequiredValidator(name, 'name'),
      new StringValidator(name, 'name'),
      new RequiredValidator(password, 'password'),
      new StringValidator(password, 'password'),
      new RequiredValidator(passwordConfirmation, 'passwordConfirmation'),
      new StringValidator(passwordConfirmation, 'passwordConfirmation'),
      new CompareFieldsValidation(password, 'passwordConfirmation', passwordConfirmation)
    ])
  })

  it('Should call Signup with correct values', async () => {
    await sut.handle({ body: { email, name, password, passwordConfirmation } })

    expect(signup.perform).toHaveBeenCalledWith({ email, name, password })
    expect(signup.perform).toHaveBeenCalledTimes(1)
  })

  it('Should return 401 if Signup fails', async () => {
    signup.perform.mockResolvedValueOnce(undefined)
    const httpResponse = await sut.handle({ body: { email, name, password, passwordConfirmation } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('Should return 200 if Signup succeeds', async () => {
    const httpResponse = await sut.handle({ body: { email, name, password, passwordConfirmation } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken
      }
    })
  })

  it('Should return 500 if Signup throws', async () => {
    const error = new Error('infra_error')
    signup.perform.mockRejectedValueOnce(error)
    const httpResponse = await sut.handle({ body: { email, name, password, passwordConfirmation } })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
})
