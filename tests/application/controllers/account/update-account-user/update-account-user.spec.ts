import { Controller, UpdateAccountUserController } from '@/application/controllers'
import { RequiredValidator, StringValidator } from '@/application/validation'

describe('UpdateAccountUserController', () => {
  let sut: UpdateAccountUserController
  let userId: string
  let roleId: string

  beforeAll(() => {
    userId = 'any_id'
    roleId = 'any_role_id'
  })

  beforeEach(() => {
    sut = new UpdateAccountUserController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ params: { userId }, body: { roleId } })

    expect(validators).toEqual([
      new RequiredValidator(userId, 'userId'),
      new StringValidator(userId, 'userId'),
      new RequiredValidator(roleId, 'roleId'),
      new StringValidator(roleId, 'roleId')
    ])
  })
})
