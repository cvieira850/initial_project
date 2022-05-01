import { Middleware } from '@/application/middlewares'
import { HttpRequest, HttpResponse, forbidden } from '@/application/helpers'
import { LoadAccountByToken } from '@/domain/usecases'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const accessToken = httpRequest.headers['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.perform({ accessToken, role: this.role })
    }
    return forbidden()
  }
}
