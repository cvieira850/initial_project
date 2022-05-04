import { Controller } from '@/application/controllers'
import { HttpRequest, HttpResponse, noContent, ok } from '@/application/helpers'
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
    const user = await this.loadAccountById.perform({ id: httpRequest.params.userId })
    if (!user) {
      return noContent()
    }
    return ok({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: user.access_token
    })
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.params.userId, fieldName: 'userId' }).required().string().build()
    ]
  }
}
