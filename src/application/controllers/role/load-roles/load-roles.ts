import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse } from '@/application/helpers'
import { LoadRoles } from '@/domain/usecases'

export class LoadRolesController extends Controller {
  constructor (private readonly loadRoles: LoadRoles) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    await this.loadRoles.perform(null)
    throw new Error('Method not implemented.')
  }
}
