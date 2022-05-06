import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse, noContent } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { LoadEventById } from '@/domain/usecases'

export class LoadEventByIdController extends Controller {
  constructor (private readonly loadEventById: LoadEventById) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    await this.loadEventById.perform({ id: httpRequest.params.eventId })

    return noContent()
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.eventId, fieldName: 'eventId' }).required().string().build()
    ]
  }
}
