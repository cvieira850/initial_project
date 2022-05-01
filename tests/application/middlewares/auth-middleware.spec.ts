import { forbidden } from '@/application/helpers'
import { AuthMiddleware } from '@/application/middlewares'
import { LoadAccountByToken } from '@/domain/usecases'
import { mock, MockProxy } from 'jest-mock-extended'

describe('Auth Middlewares', () => {
  let sut: AuthMiddleware
  let loadAccountByToken: MockProxy<LoadAccountByToken>

  beforeAll(() => {
    loadAccountByToken = mock()
    loadAccountByToken.perform.mockResolvedValue({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      role: 'any_role',
      access_token: 'any_token'
    })
  })

  it('Should return 403 if no x-access-token exists in headers', async () => {
    sut = new AuthMiddleware(loadAccountByToken)

    const response = await sut.handle({ headers: {} })

    expect(response).toEqual(forbidden())
  })

  it('Should return 403 if x-access-token is invalid', async () => {
    loadAccountByToken.perform.mockResolvedValueOnce(undefined)
    sut = new AuthMiddleware(loadAccountByToken)

    const response = await sut.handle({ headers: { 'x-access-token': 'invalid_token' } })

    expect(response).toEqual(forbidden())
  })

  it('Should call LoadAccountByToken with correct values', async () => {
    sut = new AuthMiddleware(loadAccountByToken)
    await sut.handle({ headers: { 'x-access-token': 'valid_token' } })

    expect(loadAccountByToken.perform).toHaveBeenCalledWith({ accessToken: 'valid_token', role: undefined })
    expect(loadAccountByToken.perform).toHaveBeenCalledTimes(1)
  })

  it('Should call LoadAccountByToken with correct values', async () => {
    sut = new AuthMiddleware(loadAccountByToken, 'any_role')
    await sut.handle({ headers: { 'x-access-token': 'valid_token' } })

    expect(loadAccountByToken.perform).toHaveBeenCalledWith({ accessToken: 'valid_token', role: 'any_role' })
    expect(loadAccountByToken.perform).toHaveBeenCalledTimes(1)
  })

  it('Should return 200 if x-access-token is valid', async () => {
    sut = new AuthMiddleware(loadAccountByToken)
    const response = await sut.handle({ headers: { 'x-access-token': 'valid_token' } })

    expect(response).toEqual({ statusCode: 200, data: { accountId: 'any_id' } })
  })
  it('Should return 200 with role if x-access-token is valid', async () => {
    sut = new AuthMiddleware(loadAccountByToken, 'any_role')
    const response = await sut.handle({ headers: { 'x-access-token': 'valid_token' } })

    expect(response).toEqual({ statusCode: 200, data: { accountId: 'any_id' } })
  })
})
