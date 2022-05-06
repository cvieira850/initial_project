import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

export class LoadEventByIdController extends Controller {
  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.eventId, fieldName: 'eventId' }).required().string().build()
    ]
  }
}
