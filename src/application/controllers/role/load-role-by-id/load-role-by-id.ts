import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse } from '@/application/helpers'

export class LoadRoleByIdController extends Controller {
  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}
