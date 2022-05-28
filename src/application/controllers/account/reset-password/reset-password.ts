import { HttpRequest, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

export class ResetPasswordController extends Controller {
  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.token, fieldName: 'token' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.password, fieldName: 'password' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.passwordConfirmation, fieldName: 'passwordConfirmation' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.password, fieldName: 'passwordConfirmation' }).validateCompareFields(httpRequest.body.passwordConfirmation).build()
    ]
  }
}
