import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { LoadRoleById } from '@/domain/usecases'

export class LoadRoleByIdController extends Controller {
  constructor (private readonly loadRoleById: LoadRoleById) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    await this.loadRoleById.perform({ id: httpRequest.params.roleId })
    throw new Error('Method not implemented.')
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.roleId, fieldName: 'roleId' }).required().string().build()
    ]
  }
}
