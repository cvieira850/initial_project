import { Controller, LoadRolesController } from '@/application/controllers'

describe('LoadRolesController', () => {
  let sut: LoadRolesController

  beforeEach(() => {
    sut = new LoadRolesController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
