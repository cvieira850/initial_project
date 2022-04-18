import { Controller } from '@/application/controllers'
import { Authentication } from '@/domain/usecases'
import { HttpRequest, HttpResponse, forbidden } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type Model = Error | {
  accessToken: string
}

export class AuthenticationController extends Controller {
  constructor (private readonly authentication: Authentication) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.authentication.perform({ email: httpRequest.body.email, password: httpRequest.body.password })

    return forbidden()
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.body.email, fieldName: 'email' }).required().string().validateEmail().build(),
      ...Builder.of({ value: httpRequest.body.password, fieldName: 'password' }).required().string().build()
    ]
  }
}
