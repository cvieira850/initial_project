import { HttpRequest, HttpResponse, noContent } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { ForgotPassword } from '@/domain/usecases'

export class ForgotPasswordController extends Controller {
  constructor (private readonly forgotPassword: ForgotPassword) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    await this.forgotPassword.perform({ email: httpRequest.body.email })

    return noContent()
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.body.email, fieldName: 'email' }).required().validateEmail().string().build()
    ]
  }
}
