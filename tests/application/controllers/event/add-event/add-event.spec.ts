import { Controller, AddEventController } from '@/application/controllers'
import { RequiredStringValidator, StringValidator } from '@/application/validation'

describe('AddEventController', () => {
  let sut: AddEventController
  let accountId: string
  let name: string
  let description: string

  beforeAll(() => {
    accountId = 'any_id'
    name = 'any_name'
    description = 'any_description'
  })
  beforeEach(() => {
    sut = new AddEventController()
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({
      headers: { accountId: 'any_id' },
      body: { name, description }
    })

    expect(validators).toEqual([
      new RequiredStringValidator(accountId, 'accountId'),
      new StringValidator(accountId, 'accountId'),
      new RequiredStringValidator(name, 'name'),
      new StringValidator(name, 'name'),
      new RequiredStringValidator(description, 'description'),
      new StringValidator(description, 'description')
    ])
  })
})
