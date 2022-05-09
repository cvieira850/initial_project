import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse, ok, unauthorized } from '@/application/helpers'
import { LoadRoles } from '@/domain/usecases'

export class LoadRolesController extends Controller {
  constructor (private readonly loadRoles: LoadRoles) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const roles = await this.loadRoles.perform(null)
    if (roles) {
      return ok(roles)
    }
    return unauthorized()
  }
}
