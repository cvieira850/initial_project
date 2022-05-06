import { LoadEventByIdController, Controller } from '@/application/controllers'

describe('LoadEventByIdController', () => {
  let sut: LoadEventByIdController

  beforeEach(() => {
    sut = new LoadEventByIdController()
  })
  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
