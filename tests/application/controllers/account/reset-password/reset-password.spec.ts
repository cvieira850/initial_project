import { Controller, ResetPasswordController } from '@/application/controllers'

describe('ResetPasswordController', () => {
  let sut: ResetPasswordController

  beforeEach(() => {
    sut = new ResetPasswordController()
  })

  it('Should be an instance of Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
