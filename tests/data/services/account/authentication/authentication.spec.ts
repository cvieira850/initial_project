import { LoadAccountByEmailRepository } from '@/data/protocols/db'
import { AuthenticationService } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Authentication Service', () => {
  let sut: AuthenticationService
  let accountRepo: MockProxy<LoadAccountByEmailRepository>
  let email: string
  let password: string

  beforeAll(() => {
    email = 'any_email'
    password = 'any_password'
    accountRepo = mock()
    accountRepo.loadByEmail.mockResolvedValue({
      id: 'any_id',
      name: 'any_name',
      email
    })
  })
  beforeEach(() => {
    sut = new AuthenticationService(accountRepo)
  })
  describe('Load Account By Email Repository', () => {
    it('Should call LoadAccountByEmailRepository with correct email', async () => {
      await sut.perform({ email, password })

      expect(accountRepo.loadByEmail).toHaveBeenCalledWith({ email })
      expect(accountRepo.loadByEmail).toHaveBeenCalledTimes(1)
    })
  })
})
