
import { BcryptAdapter } from '@/infra/cryptography'

import bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter
  let salt: number
  let fakeHash: jest.Mocked<typeof bcrypt>

  beforeAll(() => {
    fakeHash = bcrypt as jest.Mocked<typeof bcrypt>
    fakeHash.hash.mockImplementation(() => 'any_hash')
    salt = 12
  })
  beforeEach(() => {
    sut = new BcryptAdapter(salt)
  })

  describe('Hash', () => {
    it('Should call hash with correct params', async () => {
      await sut.hash({ plaintext: 'any_plaintext' })

      expect(fakeHash.hash).toHaveBeenCalledWith('any_plaintext', 12)
      expect(fakeHash.hash).toHaveBeenCalledTimes(1)
    })

    it('Should return a hash', async () => {
      const hashedValue = await sut.hash({ plaintext: 'any_plaintext' })

      expect(hashedValue).toBe('any_hash')
    })

    it('Should rethrow if hash throws', async () => {
      fakeHash.hash.mockImplementation(() => { throw new Error('bcrypt_error') })
      const promise = sut.hash({ plaintext: 'any_plaintext' })

      await expect(promise).rejects.toThrow(new Error('bcrypt_error'))
    })
  })
})
