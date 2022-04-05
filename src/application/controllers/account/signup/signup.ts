import { HttpResponse, unauthorized, ok, HttpRequest } from '@/application/helpers'
import { Signup } from '@/domain/usecases'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { Controller } from '@/application/controllers'

type Model = Error | {
  accessToken: string
}

export class SignupController extends Controller {
  constructor (private readonly signup: Signup) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const result = await this.signup.perform({ email: httpRequest.body.email, name: httpRequest.body.name, password: httpRequest.body.password })
    return result === undefined ? unauthorized() : ok(result)
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.body.email, fieldName: 'email' }).required().validateEmail().build(),
      ...Builder.of({ value: httpRequest.body.name, fieldName: 'name' }).required().build(),
      ...Builder.of({ value: httpRequest.body.password, fieldName: 'password' }).required().build(),
      ...Builder.of({ value: httpRequest.body.passwordConfirmation, fieldName: 'passwordConfirmation' }).required().build(),
      ...Builder.of({ value: httpRequest.body.password, fieldName: 'passwordConfirmation' }).validateCompareFields(httpRequest.body.passwordConfirmation).build()
    ]
  }
}
