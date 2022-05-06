import { LoadEventByIdController, Controller } from '@/application/controllers'
import { RequiredStringValidator, StringValidator } from '@/application/validation'

describe('LoadEventByIdController', () => {
  let sut: LoadEventByIdController
  let eventId: string

  beforeAll(() => {
    eventId = 'any_id'
  })

  beforeEach(() => {
    sut = new LoadEventByIdController()
  })
  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build validators correctly', () => {
    const validators = sut.buildValidators({
      params: { eventId }
    })

    expect(validators).toEqual([
      new RequiredStringValidator(eventId, 'eventId'),
      new StringValidator(eventId, 'eventId')
    ])
  })
})
