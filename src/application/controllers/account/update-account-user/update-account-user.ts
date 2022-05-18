import { HttpRequest, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'

export class UpdateAccountUserController extends Controller {
  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}
