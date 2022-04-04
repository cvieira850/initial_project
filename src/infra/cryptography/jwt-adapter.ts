import { Encrypt } from '@/data/protocols/cryptography/encrypt'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypt {
  constructor (private readonly secret: string) {}
  async encrypt (params: Encrypt.Params): Promise<Encrypt.Result> {
    return await jwt.sign({ id: params.plaintext }, this.secret)
  }
}
