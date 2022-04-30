import { Decrypter } from '@/data/protocols/cryptography'
import { LoadAccountByTokenService } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadAccountByTokenService', () => {
  let sut: LoadAccountByTokenService
  let decripter: MockProxy<Decrypter>
  let accessToken: string
  let role: string
  let result: string

  beforeAll(() => {
    accessToken = 'any_token'
    role = 'any_role'
    result = 'decrypted_id'
    decripter = mock()
    decripter.decrypt.mockResolvedValue(result)
  })
  beforeEach(() => {
    sut = new LoadAccountByTokenService(decripter)
  })
  describe('Decrypter', () => {
    it('Should call Decrypter with correct accessToken', async () => {
      await sut.perform({ accessToken, role })

      expect(decripter.decrypt).toHaveBeenCalledWith({ ciphertext: accessToken })
      expect(decripter.decrypt).toHaveBeenCalledTimes(1)
    })
  })
})
