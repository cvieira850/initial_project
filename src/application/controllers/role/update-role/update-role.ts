import { HttpRequest, HttpResponse } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { UpdateRole } from '@/domain/usecases'

export class UpdateRoleController extends Controller {
  constructor (private readonly usecase: UpdateRole) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    await this.usecase.perform(
      {
        id: httpRequest.params.roleId,
        name: httpRequest.body.name,
        weight: httpRequest.body.weight
      })
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
