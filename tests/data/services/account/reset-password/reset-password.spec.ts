import { ResetPasswordService } from '@/data/services'
import { LoadAccountByResetTokenRepository } from '@/data/protocols/db'
import { Hash } from '@/data/protocols/cryptography'

import { mock, MockProxy } from 'jest-mock-extended'
import { InvalidRequestError } from '@/data/errors'

describe('ResetPassword Service', () => {
  let sut: ResetPasswordService
  let accountRepo: MockProxy<LoadAccountByResetTokenRepository>
  let hash: MockProxy<Hash>
  let id: string
  let token: string
  let password: string
  let name: string
  let email: string
  let hashedPassword: string

  beforeAll(() => {
    id = 'any_id'
    token = 'any_token'
    password = 'any_password'
    name = 'any_name'
    email = 'any_email'
    hashedPassword = 'any_hashed_password'
    accountRepo = mock()
    accountRepo.loadByResetToken.mockResolvedValue({
      id,
      name,
      email
    })
    hash = mock()
    hash.hash.mockResolvedValue(hashedPassword)
  })

  beforeEach(() => {
    sut = new ResetPasswordService(accountRepo, hash)
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

    it('Should return an error if LoadAccountByResetToken return undefined', async () => {
      accountRepo.loadByResetToken.mockResolvedValueOnce(undefined)

      const promise = sut.perform({ token, password })

      await expect(promise).rejects.toThrow(new InvalidRequestError('Account not found'))
    })
  })

  describe('Hash', () => {
    it('Should call Hash with correct password', async () => {
      await sut.perform({ token, password })

      expect(hash.hash).toHaveBeenCalledWith({ plaintext: password })
      expect(hash.hash).toHaveBeenCalledTimes(1)
    })

    it('(Should rethrow if hash throws)', async () => {
      hash.hash.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ token, password })

      await expect(promise).rejects.toThrow(new Error())
    })
  })
})
