import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse, noContent, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { LoadEventById } from '@/domain/usecases'

type Model = Error | {
  id: string
  name: string
  description: string
  user_id: string
  created_at: Date
}

export class LoadEventByIdController extends Controller {
  constructor (private readonly loadEventById: LoadEventById) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const event = await this.loadEventById.perform({ id: httpRequest.params.eventId })
    if (!event) {
      return noContent()
    }
    return ok({
      id: event.id,
      name: event.name,
      description: event.description,
      user_id: event.user_id,
      created_at: event.created_at
    })
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.eventId, fieldName: 'eventId' }).required().string().build()
    ]
  }
}
