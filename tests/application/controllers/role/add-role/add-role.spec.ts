import { AddRoleController, Controller } from '@/application/controllers'

describe('AddRoleController', () => {
  let sut: AddRoleController

  beforeEach(async () => {
    sut = new AddRoleController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
