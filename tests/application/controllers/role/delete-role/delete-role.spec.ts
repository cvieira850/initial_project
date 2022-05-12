import { Controller, DeleteRoleController } from '@/application/controllers'

describe('DeleteRole Controller', () => {
  let sut: DeleteRoleController

  beforeEach(() => {
    sut = new DeleteRoleController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
