import { Controller, UpdateRoleController } from '@/application/controllers'
import { NumberValidator, RequiredValidator, StringValidator } from '@/application/validation'

describe('UpdateRole Repository', () => {
  let sut: UpdateRoleController
  let roleId: string
  let name: string
  let weight: number

  beforeAll(() => {
    roleId = 'any_id'
    name = 'any_name'
    weight = 1
  })

  beforeEach(() => {
    sut = new UpdateRoleController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({
      params: { roleId },
      body: { name, weight }
    })

    expect(validators).toEqual([
      new RequiredValidator(roleId, 'roleId'),
      new StringValidator(roleId, 'roleId'),
      new RequiredValidator(name, 'name'),
      new StringValidator(name, 'name'),
      new RequiredValidator(weight, 'weight'),
      new NumberValidator(weight, 'weight')
    ])
  })
})
