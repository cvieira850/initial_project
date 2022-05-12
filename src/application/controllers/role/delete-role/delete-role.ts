import { HttpRequest, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { DeleteRole } from '@/domain/usecases'

export class DeleteRoleController extends Controller {
  constructor (private readonly usecase: DeleteRole) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    await this.usecase.perform({ id: httpRequest.params.roleId })
    throw new Error('Method not implemented.')
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.roleId, fieldName: 'roleId' }).required().string().build()
    ]
  }
}
