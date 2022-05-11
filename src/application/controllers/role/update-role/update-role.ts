import { HttpRequest, HttpResponse } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { Controller } from '@/application/controllers'

export class UpdateRoleController extends Controller {
  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.roleId, fieldName: 'roleId' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.name, fieldName: 'name' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.weight, fieldName: 'weight' }).required().number().build()
    ]
  }
}
