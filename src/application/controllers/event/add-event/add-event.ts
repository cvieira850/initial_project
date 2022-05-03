import { HttpRequest, HttpResponse, unauthorized } from '@/application/helpers'
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
    await this.addEvent.perform({
      userId: httpRequest.headers.accountId,
      name: httpRequest.body.name,
      description: httpRequest.body.description
    })

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
