import { LoadAccountByEmailRepository } from '@/data/protocols/db'
import { AuthenticationService } from '@/data/services'
import { HashComparer, Encrypt } from '@/data/protocols/cryptography'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Authentication Service', () => {
  let sut: AuthenticationService
  let accountRepo: MockProxy<LoadAccountByEmailRepository>
  let hashComparer: MockProxy<HashComparer>
  let encrypt: MockProxy<Encrypt>
  let email: string
  let password: string
  let id: string
  let accessToken: string

  beforeAll(() => {
    email = 'any_email'
    password = 'any_password'
    id = 'any_id'
    accessToken = 'any_access_token'
    accountRepo = mock()
    hashComparer = mock()
    encrypt = mock()
    accountRepo.loadByEmail.mockResolvedValue({
      id,
      name: 'any_name',
      email,
      password: 'hashed_password'
    })
    hashComparer.compare.mockResolvedValue(true)
    encrypt.encrypt.mockResolvedValue(accessToken)
  })

  beforeEach(() => {
    sut = new AuthenticationService(accountRepo, hashComparer, encrypt)
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

  describe('HashComparer', () => {
    it('Should call HashComparer once', async () => {
      await sut.perform({ email, password })

      expect(hashComparer.compare).toHaveBeenCalledWith({ plaintext: password, digest: 'hashed_password' })
      expect(hashComparer.compare).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if HashComparer throws', async () => {
      hashComparer.compare.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ email, password })

      await expect(promise).rejects.toThrow(new Error())
    })

    it('Should return undefined if HashComparer returns false', async () => {
      hashComparer.compare.mockReturnValueOnce(Promise.resolve(false))
      const result = await sut.perform({ email, password })

      expect(result).toBeUndefined()
    })
  })

  describe('Encrypt', () => {
    it('Should call encrypt with correct value once', async () => {
      await sut.perform({ email, password })

      expect(encrypt.encrypt).toHaveBeenCalledWith({ plaintext: id })
      expect(encrypt.encrypt).toHaveBeenCalledTimes(1)
    })
  })
})
