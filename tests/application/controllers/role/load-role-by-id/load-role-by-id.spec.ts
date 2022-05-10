import { Controller, LoadRoleByIdController } from '@/application/controllers'

describe('LoadRoleByIdController', () => {
  let sut: LoadRoleByIdController

  beforeEach(() => {
    sut = new LoadRoleByIdController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
