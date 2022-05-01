import { JwtAdapter } from '@/infra/cryptography'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('Jwt Adapter', () => {
  let sut: JwtAdapter
  let secret: string
  let fakeCompare: jest.Mocked<typeof jwt>
  let plaintext: string
  let ciphertext: string

  beforeAll(() => {
    fakeCompare = jwt as jest.Mocked<typeof jwt>
    fakeCompare.sign.mockImplementation(() => 'any_hash')
    fakeCompare.verify.mockImplementation(() => 'any_value')
    secret = 'secret'
    plaintext = 'any_plaintext'
    ciphertext = 'any_token'
  })
  beforeEach(() => {
    sut = new JwtAdapter(secret)
  })
  describe('Sign()', () => {
    it('Should call sign with correct values', async () => {
      await sut.encrypt({ plaintext })

      expect(fakeCompare.sign).toHaveBeenCalledWith({ id: plaintext }, secret)
    })

    it('Should return a token on sign success', async () => {
      const accessToken = await sut.encrypt({ plaintext })
      expect(accessToken).toBe('any_hash')
    })

    it('Should throw if sign throws', async () => {
      fakeCompare.sign.mockImplementation(() => { throw new Error('jwt_error') })

      const promise = sut.encrypt({ plaintext })

      await expect(promise).rejects.toThrow()
    })
  })

  describe('Verify', () => {
    it('Should call verify with correct values', async () => {
      await sut.decrypt({ ciphertext })

      expect(fakeCompare.verify).toHaveBeenCalledWith(ciphertext, secret)
    })
  })
})
