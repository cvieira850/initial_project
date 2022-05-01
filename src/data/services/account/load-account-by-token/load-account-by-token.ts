import { LoadAccountByToken, Decrypter, LoadAccountByTokenRepository } from './load-account-by-token-protocols'

export class LoadAccountByTokenService implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async perform (params: LoadAccountByToken.Params): Promise<LoadAccountByToken.Result> {
    const tokenDecripted = await this.decrypter.decrypt({ ciphertext: params.accessToken })
    if (tokenDecripted) {
      await this.loadAccountByTokenRepository.loadByToken({ accessToken: params.accessToken, role: params.role })
    }
    return undefined
  }
}
