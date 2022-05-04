import { badRequest, HttpResponse, serverError, HttpRequest } from '@/application/helpers'
import { ValidationComposite, Validator } from '@/application/validation'

export abstract class Controller {
  abstract perform (httpRequest: HttpRequest): Promise<HttpResponse>

  buildValidators (httpRequest: HttpRequest): Validator[] {
    return []
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validate(httpRequest)
    if (error !== undefined) {
      return badRequest(error)
    }
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  private validate (httpRequest: HttpRequest): Error | undefined {
    const validators = this.buildValidators(httpRequest)
    return new ValidationComposite(validators).validate()
  }
}
