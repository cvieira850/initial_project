
import { Controller, UpdateAccountUserController } from '@/application/controllers'

describe('UpdateAccountUserController', () => {
  let sut: UpdateAccountUserController

  beforeEach(() => {
    sut = new UpdateAccountUserController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
