import { HttpRequest, HttpResponse, unauthorized, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { UpdateAccountRole } from '@/domain/usecases'

export class UpdateAccountRoleController extends Controller {
  constructor (private readonly updateAccountRole: UpdateAccountRole) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const user = await this.updateAccountRole.perform({ id: httpRequest.params.userId, roleId: httpRequest.body.roleId })
    if (user) {
      return ok(user)
    }
    return unauthorized()
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.userId, fieldName: 'userId' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.roleId, fieldName: 'roleId' }).required().string().build()
    ]
  }
}
