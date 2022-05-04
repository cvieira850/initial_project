import { Controller, LoadUserByIdController } from '@/application/controllers'
import { RequiredStringValidator, StringValidator } from '@/application/validation'

describe('LoadUserByIdController', () => {
  let sut: LoadUserByIdController
  let userId: string

  beforeAll(() => {
    userId = 'any_id'
  })

  beforeEach(() => {
    sut = new LoadUserByIdController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ params: { userId: 'any_id' } })

    expect(validators).toEqual([
      new RequiredStringValidator(userId, 'userId'),
      new StringValidator(userId, 'userId')
    ])
  })
})
