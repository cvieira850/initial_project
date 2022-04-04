import { Hash } from '@/data/protocols/cryptography'
import { LoadAccountByEmailRepository } from '@/data/protocols/db'
import { SignupService } from '@/data/services/account/signup/signup'

import { mock, MockProxy } from 'jest-mock-extended'

describe('SignupService', () => {
  let sut: SignupService
  let loadAccountByEmailRepository: MockProxy<LoadAccountByEmailRepository>
  let hash: MockProxy<Hash>
  let email: string
  let name: string
  let password: string

  beforeAll(() => {
    email = 'any_email'
    name = 'any_name'
    password = 'any_password'
    loadAccountByEmailRepository = mock()
    loadAccountByEmailRepository.loadByEmail.mockResolvedValue(undefined)
    hash = mock()
    hash.hash.mockResolvedValue('hashed_password')
  })

  beforeEach(() => {
    sut = new SignupService(loadAccountByEmailRepository, hash)
  })

  describe('LoadAccountByEmail Repository', () => {
    it('Should call LoadAccountByEmail with correct email', async () => {
      await sut.perform({ email, name, password })

      expect(loadAccountByEmailRepository.loadByEmail).toHaveBeenCalledWith(email)
      expect(loadAccountByEmailRepository.loadByEmail).toHaveBeenCalledTimes(1)
    })

    it('Should return undefined if LoadAccountByEmailRepository retuns an account', async () => {
      loadAccountByEmailRepository.loadByEmail.mockResolvedValueOnce({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email'
      })

      const result = await sut.perform({ email, name, password })

      expect(result).toBeUndefined()
    })

    it('Should rethrow if LoadAccountByEmailRepository throws', async () => {
      loadAccountByEmailRepository.loadByEmail.mockRejectedValueOnce(new Error())

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
  })
})
