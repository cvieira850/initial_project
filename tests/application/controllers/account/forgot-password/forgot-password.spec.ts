import { Controller, ForgotPasswordController } from '@/application/controllers'

describe('ForgotPassword Controller', () => {
  let sut: ForgotPasswordController

  beforeEach(() => {
    sut = new ForgotPasswordController()
  })

  it('Should be an instance of Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
