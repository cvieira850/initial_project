import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

export class MeController extends Controller {
  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }

  buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.headers.accountId, fieldName: 'accountId' }).required().string().build()
    ]
  }
}
