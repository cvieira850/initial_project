import { ResetPasswordService } from '@/data/services'
import { LoadAccountByResetTokenRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('ResetPassword Service', () => {
  let sut: ResetPasswordService
  let accountRepo: MockProxy<LoadAccountByResetTokenRepository>
  let id: string
  let token: string
  let password: string
  let name: string
  let email: string

  beforeAll(() => {
    id = 'any_id'
    token = 'any_token'
    password = 'any_password'
    name = 'any_name'
    email = 'any_email'
    accountRepo = mock()
    accountRepo.loadByResetToken.mockResolvedValue({
      id,
      name,
      email
    })
  })

  beforeEach(() => {
    sut = new ResetPasswordService(accountRepo)
  })

  describe('LoadAccountByResetToken Repository', () => {
    it('should call LoadAccountByResetToken with correct values', async () => {
      await sut.perform({ token, password })

      expect(accountRepo.loadByResetToken).toHaveBeenCalledWith({ token: 'any_token' })
      expect(accountRepo.loadByResetToken).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if LoadAccountByResetToken throws', async () => {
      accountRepo.loadByResetToken.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ token, password })

      await expect(promise).rejects.toThrow()
    })
  })
})
