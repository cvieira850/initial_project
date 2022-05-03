import { HttpRequest, HttpResponse, unauthorized, ok } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddEvent } from '@/domain/usecases'

export class AddEventController extends Controller {
  constructor (
    private readonly addEvent: AddEvent
  ) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const event = await this.addEvent.perform({
      userId: httpRequest.headers.accountId,
      name: httpRequest.body.name,
      description: httpRequest.body.description
    })
    if (event) {
      return ok(event)
    }

    return unauthorized()
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.headers.accountId, fieldName: 'accountId' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.name, fieldName: 'name' }).required().string().build(),
      ...Builder.of({ value: httpRequest.body.description, fieldName: 'description' }).required().string().build()
    ]
  }
}
