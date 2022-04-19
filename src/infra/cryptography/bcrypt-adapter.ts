import { Hash, HashComparer } from '@/data/protocols/cryptography'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hash, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (params: Hash.Params): Promise<Hash.Result> {
    return await bcrypt.hash(params.plaintext, this.salt)
  }

  async compare (params: HashComparer.Params): Promise<boolean> {
    return await bcrypt.compare(params.plaintext, params.digest)
  }
}
