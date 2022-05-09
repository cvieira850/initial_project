import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddRole } from '@/domain/usecases'

export class AddRoleController extends Controller {
  constructor (private readonly addRole: AddRole) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const role = await this.addRole.perform({ name: httpRequest.body.name, weight: httpRequest.body.weight })

    return ok(role)
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.body.name, fieldName: 'name' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.weight, fieldName: 'weight' }).required().number().build()
    ]
  }
}
