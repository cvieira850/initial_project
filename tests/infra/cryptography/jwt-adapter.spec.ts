import { JwtAdapter } from '@/infra/cryptography'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('Jwt Adapter', () => {
  let sut: JwtAdapter
  let secret: string
  let fakeCompare: jest.Mocked<typeof jwt>
  let plaintext: string

  beforeAll(() => {
    fakeCompare = jwt as jest.Mocked<typeof jwt>
    fakeCompare.sign.mockImplementation(() => 'any_hash')
    secret = 'secret'
    plaintext = 'any_plaintext'
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
})
