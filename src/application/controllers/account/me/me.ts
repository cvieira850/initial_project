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
export class MeController extends Controller {
  constructor (private readonly loadAccountById: LoadAccountById) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const user = await this.loadAccountById.perform({ id: httpRequest.headers.accountId })
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
      ...Builder.of({ value: httpRequest.headers.accountId, fieldName: 'accountId' }).required().string().build()
    ]
  }
}
