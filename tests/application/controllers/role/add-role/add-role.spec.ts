import { AddRoleController, Controller } from '@/application/controllers'
import { NumberValidator, RequiredValidator, StringValidator } from '@/application/validation'

describe('AddRoleController', () => {
  let sut: AddRoleController
  let name: string
  let weight: number

  beforeAll(() => {
    name = 'any_name'
    weight = 1
  })

  beforeEach(async () => {
    sut = new AddRoleController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({
      body: { name, weight }
    })

    expect(validators).toEqual([
      new RequiredValidator(name, 'name'),
      new StringValidator(name, 'name'),
      new RequiredValidator(weight, 'weight'),
      new NumberValidator(weight, 'weight')
    ])
  })
})
