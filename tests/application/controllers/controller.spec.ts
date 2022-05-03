import { Controller } from '@/application/controllers'
import { ServerError } from '@/application/errors'
import { HttpResponse } from '@/application/helpers'
import { ValidationComposite } from '@/application/validation'

import { mocked } from 'jest-mock'

jest.mock('@/application/validation/composite')

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.result
  }
}
describe('Controller', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })
  it('Should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const httpResponse = await sut.handle({ body: { value: 'any_value' } })

    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('Should return 500 if perform throws', async () => {
    const error = new Error('perform_error')
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ body: { email: 'teste@teste.com', role: 'user' } })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('Should return 500 if perform throws a non error object', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce('perform_error')

    const httpResponse = await sut.handle({ body: { email: 'teste@teste.com', role: 'user' } })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError()
    })
  })

  it('Should return same result as perform', async () => {
    const httpResponse = await sut.handle({ body: { email: 'teste@teste.com', role: 'user' } })

    expect(httpResponse).toEqual(sut.result)
  })
})
