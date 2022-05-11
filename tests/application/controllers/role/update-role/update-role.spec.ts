import { Controller, UpdateRoleController } from '@/application/controllers'

describe('UpdateRole Repository', () => {
  let sut: UpdateRoleController

  beforeEach(() => {
    sut = new UpdateRoleController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
