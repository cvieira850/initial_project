import { LoadAccountByToken, Decrypter } from './load-account-by-token-protocols'

export class LoadAccountByTokenService implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}
  async perform (params: LoadAccountByToken.Params): Promise<LoadAccountByToken.Result> {
    await this.decrypter.decrypt({ ciphertext: params.accessToken })
    return undefined
  }
}
