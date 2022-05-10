import { Controller, LoadRoleByIdController } from '@/application/controllers'
import { RequiredValidator, StringValidator } from '@/application/validation'

describe('LoadRoleByIdController', () => {
  let sut: LoadRoleByIdController
  let roleId: string

  beforeAll(() => {
    roleId = 'any_id'
  })
  beforeEach(() => {
    sut = new LoadRoleByIdController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ params: { roleId } })

    expect(validators).toEqual([
      new RequiredValidator(roleId, 'roleId'),
      new StringValidator(roleId, 'roleId')
    ])
  })
})
