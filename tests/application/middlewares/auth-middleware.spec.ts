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
})
