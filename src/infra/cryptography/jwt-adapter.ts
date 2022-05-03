import { Encrypt, Decrypter } from '@/data/protocols/cryptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypt {
  constructor (private readonly secret: string) {}

  async encrypt (params: Encrypt.Params): Promise<Encrypt.Result> {
    return await jwt.sign({ id: params.plaintext }, this.secret)
  }

  async decrypt (params: Decrypter.Params): Promise<Decrypter.Result> {
    try {
      return await jwt.verify(params.ciphertext, this.secret) as string
    } catch (error) {
      return new Error('Invalid token')
    }
  }
}
