import { HttpRequest, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

export class ForgotPasswordController extends Controller {
  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.body.email, fieldName: 'email' }).required().validateEmail().string().build()
    ]
  }
}
