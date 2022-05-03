import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse, noContent } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { LoadAccountById } from '@/domain/usecases'

export class MeController extends Controller {
  constructor (private readonly loadAccountById: LoadAccountById) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    await this.loadAccountById.perform({ id: httpRequest.headers.accountId })
    return noContent()
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.headers.accountId, fieldName: 'accountId' }).required().string().build()
    ]
  }
}
