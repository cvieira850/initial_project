import { HttpRequest, HttpResponse, unauthorized, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { Controller } from '@/application/controllers'
import { UpdateRole } from '@/domain/usecases'
import { InvalidRequestError } from '@/data/errors'

export class UpdateRoleController extends Controller {
  constructor (private readonly usecase: UpdateRole) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const role = await this.usecase.perform(
        {
          id: httpRequest.params.roleId,
          name: httpRequest.body.name,
          weight: httpRequest.body.weight
        })
      if (role) {
        return ok(role)
      }
      return unauthorized()
    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return unauthorized()
      }
      throw error
    }
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.roleId, fieldName: 'roleId' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.name, fieldName: 'name' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.weight, fieldName: 'weight' }).required().number().build()
    ]
  }
}
