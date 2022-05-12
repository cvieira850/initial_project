import { HttpRequest, HttpResponse, noContent, unauthorized } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { DeleteRole } from '@/domain/usecases'
import { InvalidRequestError } from '@/data/errors'

export class DeleteRoleController extends Controller {
  constructor (private readonly usecase: DeleteRole) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      await this.usecase.perform({ id: httpRequest.params.roleId })
      return noContent()
    } catch (error) {
      if (error instanceof InvalidRequestError) {
        return unauthorized()
      }
      throw error
    }
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.roleId, fieldName: 'roleId' }).required().string().build()
    ]
  }
}
