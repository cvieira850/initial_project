import { Controller, LoadUserByIdController } from '@/application/controllers'

describe('LoadUserByIdController', () => {
  let sut: LoadUserByIdController

  beforeEach(() => {
    sut = new LoadUserByIdController()
  })
  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
