import { DbTransaction } from '@/application/protocols'
import { Middleware } from '@/application/middlewares'
import { HttpRequest, HttpResponse } from '@/application/helpers'

export class DbTransactionMiddleware implements Middleware {
  constructor (
    private readonly decoratee: Middleware,
    private readonly db: DbTransaction
  ) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.db.openTransaction()
    try {
      const httpResponse = await this.decoratee.handle(httpRequest)
      await this.db.commitTransaction()
      return httpResponse
    } catch (error) {
      await this.db.rollbackTransaction()
      throw error
    } finally {
      await this.db.closeTransaction()
    }
  }
}
