import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse, ok } from '@/application/helpers'
import { LoadRoles } from '@/domain/usecases'

export class LoadRolesController extends Controller {
  constructor (private readonly loadRoles: LoadRoles) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const roles = await this.loadRoles.perform(null)

    return ok(roles)
  }
}
