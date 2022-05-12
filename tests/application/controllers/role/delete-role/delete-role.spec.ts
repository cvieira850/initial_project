import { Controller, DeleteRoleController } from '@/application/controllers'
import { RequiredValidator, StringValidator } from '@/application/validation'

describe('DeleteRole Controller', () => {
  let sut: DeleteRoleController
  let roleId: string

  beforeAll(() => {
    roleId = 'any_id'
  })

  beforeEach(() => {
    sut = new DeleteRoleController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({
      params: { roleId }
    })

    expect(validators).toEqual([
      new RequiredValidator(roleId, 'roleId'),
      new StringValidator(roleId, 'roleId')
    ])
  })
})
