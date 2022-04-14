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

    it('Should return undefined when LoadAccountByEmailRepository returns undefined', async () => {
      accountRepo.loadByEmail.mockResolvedValueOnce(undefined)

      const result = await sut.perform({ email, password })

      expect(result).toBeUndefined()
    })

    it('Should rethrow if LoadAccountByEmailRepository throws', async () => {
      accountRepo.loadByEmail.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ email, password })

      await expect(promise).rejects.toThrow()
    })
  })
})
