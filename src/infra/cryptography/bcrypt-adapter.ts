import { Hash } from '@/data/protocols/cryptography'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hash {
  constructor (private readonly salt: number) {}
  async hash (params: Hash.Params): Promise<Hash.Result> {
    return await bcrypt.hash(params.plaintext, this.salt)
  }
}
