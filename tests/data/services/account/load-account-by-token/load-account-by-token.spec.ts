import { Decrypter } from '@/data/protocols/cryptography'
import { LoadAccountByTokenRepository } from '@/data/protocols/db'
import { LoadAccountByTokenService } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadAccountByTokenService', () => {
  let sut: LoadAccountByTokenService
  let decripter: MockProxy<Decrypter>
  let loadAccountByTokenRepository: MockProxy<LoadAccountByTokenRepository>
  let accessToken: string
  let role: string
  let result: string

  beforeAll(() => {
    accessToken = 'any_token'
    role = 'any_role'
    result = 'decrypted_id'
    decripter = mock()
    decripter.decrypt.mockResolvedValue(result)
    loadAccountByTokenRepository = mock()
    loadAccountByTokenRepository.loadByToken.mockResolvedValue({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      role: 'any_role',
      access_token: 'any_token'
    })
  })
  beforeEach(() => {
    sut = new LoadAccountByTokenService(decripter, loadAccountByTokenRepository)
  })
  describe('Decrypter', () => {
    it('Should call Decrypter with correct accessToken', async () => {
      await sut.perform({ accessToken, role })

      expect(decripter.decrypt).toHaveBeenCalledWith({ ciphertext: accessToken })
      expect(decripter.decrypt).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if Decrypter throws', async () => {
      decripter.decrypt.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ accessToken, role })

      await expect(promise).rejects.toThrow(new Error())
    })
  })

  describe('LoadAccountByTokenRepository', () => {
    it('Should call LoadAccountByTokenRepository with correct values', async () => {
      await sut.perform({ accessToken, role })

      expect(loadAccountByTokenRepository.loadByToken).toHaveBeenCalledWith({ accessToken, role })
      expect(loadAccountByTokenRepository.loadByToken).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if LoadAccountByTokenRepository throws', async () => {
      loadAccountByTokenRepository.loadByToken.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ accessToken, role })

      await expect(promise).rejects.toThrow(new Error())
    })

    it('Should return undefined if LoadAccountByTokenRepository returns undefined', async () => {
      loadAccountByTokenRepository.loadByToken.mockResolvedValueOnce(undefined)

      const promise = sut.perform({ accessToken, role })

      await expect(promise).resolves.toBeUndefined()
    })
  })
})
