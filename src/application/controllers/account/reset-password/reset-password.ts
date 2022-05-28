import { HttpRequest, HttpResponse, ok, unauthorized } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { ResetPassword } from '@/domain/usecases'
import { InvalidRequestError } from '@/data/errors'

export class ResetPasswordController extends Controller {
  constructor (private readonly resetPassword: ResetPassword) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const account = await this.resetPassword.perform({ token: httpRequest.params.token, password: httpRequest.body.password })

      if (account) {
        return ok(account)
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
      ...Builder.of({ value: httpRequest.params.token, fieldName: 'token' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.password, fieldName: 'password' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.passwordConfirmation, fieldName: 'passwordConfirmation' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.password, fieldName: 'passwordConfirmation' }).validateCompareFields(httpRequest.body.passwordConfirmation).build()
    ]
  }
}
