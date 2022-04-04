import { Hash } from '@/data/protocols/cryptography'
import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols/db'
import { SignupService } from '@/data/services/account/signup/signup'

import { mock, MockProxy } from 'jest-mock-extended'

describe('SignupService', () => {
  let sut: SignupService
  let accountRepo: MockProxy<LoadAccountByEmailRepository & AddAccountRepository>
  let hash: MockProxy<Hash>
  let email: string
  let name: string
  let password: string
  let hashedPassword: string

  beforeAll(() => {
    email = 'any_email'
    name = 'any_name'
    password = 'any_password'
    hashedPassword = 'any_hashed_password'
    accountRepo = mock()
    accountRepo.loadByEmail.mockResolvedValue(undefined)
    hash = mock()
    hash.hash.mockResolvedValue(hashedPassword)
    accountRepo = mock()
    accountRepo.add.mockResolvedValue({
      id: 'valid_id',
      name: 'any_name',
      email: 'any_email'
    })
  })

  beforeEach(() => {
    sut = new SignupService(accountRepo, hash)
  })

  describe('LoadAccountByEmail Repository', () => {
    it('Should call LoadAccountByEmail with correct email', async () => {
      await sut.perform({ email, name, password })

      expect(accountRepo.loadByEmail).toHaveBeenCalledWith(email)
      expect(accountRepo.loadByEmail).toHaveBeenCalledTimes(1)
    })

    it('Should return undefined if LoadAccountByEmailRepository retuns an account', async () => {
      accountRepo.loadByEmail.mockResolvedValueOnce({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email'
      })

      const result = await sut.perform({ email, name, password })

      expect(result).toBeUndefined()
    })

    it('Should rethrow if LoadAccountByEmailRepository throws', async () => {
      accountRepo.loadByEmail.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ email, name, password })

      await expect(promise).rejects.toThrow()
    })
  })

  describe('Hash', () => {
    it('Should call Hash with correct password', async () => {
      await sut.perform({ email, name, password })

      expect(hash.hash).toHaveBeenCalledWith({ plaintext: password })
      expect(hash.hash).toHaveBeenCalledTimes(1)
    })

    it('(Should rethrow if hash throws)', async () => {
      hash.hash.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ email, name, password })

      await expect(promise).rejects.toThrow(new Error())
    })
  })

  describe('AddAccountRepository', () => {
    it('Should call AddAccountRepository with correct values', async () => {
      await sut.perform({ email, name, password })

      expect(accountRepo.add).toHaveBeenCalledWith({
        name,
        email,
        password: hashedPassword
      })
      expect(accountRepo.add).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if AddAccountRepository throws', async () => {
      accountRepo.add.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ email, name, password })

      await expect(promise).rejects.toThrow(new Error())
    })

    it('Should return undefined if AddAccountRepository returns undefined', async () => {
      accountRepo.add.mockReturnValueOnce(Promise.resolve(undefined))

      const result = await sut.perform({ email, name, password })

      expect(result).toBeUndefined()
    })
  })
})
