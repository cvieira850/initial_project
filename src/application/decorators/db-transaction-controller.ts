import { DbTransaction } from '@/application/protocols'
import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse } from '@/application/helpers'

export class DbTransactionController extends Controller {
  constructor (
    private readonly decoratee: Controller,
    private readonly db: DbTransaction
  ) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
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
