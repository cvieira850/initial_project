import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse, noContent, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { LoadRoleById } from '@/domain/usecases'

export class LoadRoleByIdController extends Controller {
  constructor (private readonly loadRoleById: LoadRoleById) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const role = await this.loadRoleById.perform({ id: httpRequest.params.roleId })
    if (!role) {
      return noContent()
    }
    return ok(role)
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.roleId, fieldName: 'roleId' }).required().string().build()
    ]
  }
}
