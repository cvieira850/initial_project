import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { LoadAccountById } from '@/domain/usecases'

type Model = Error | {
  id: string
  name: string
  email: string
  role: string | undefined
  accessToken: string | undefined
}

export class LoadUserByIdController extends Controller {
  constructor (private readonly loadAccountById: LoadAccountById) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.loadAccountById.perform({ id: httpRequest.params.userId })
    throw new Error('Method not implemented.')
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.userId, fieldName: 'userId' }).required().string().build()
    ]
  }
}
