import { Controller, AddEventController } from '@/application/controllers'
import { AddEvent } from '@/domain/usecases'
import { RequiredStringValidator, StringValidator } from '@/application/validation'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddEventController', () => {
  let sut: AddEventController
  let addEvent: MockProxy<AddEvent>
  let accountId: string
  let name: string
  let description: string
  let id: string

  beforeAll(() => {
    id = 'any_id'
    accountId = 'any_id'
    name = 'any_name'
    description = 'any_description'
    addEvent = mock()
    addEvent.perform.mockResolvedValue({
      id,
      name,
      description,
      user_id: accountId,
      created_at: new Date()
    })
  })

  beforeEach(() => {
    sut = new AddEventController(addEvent)
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

  describe('AddEvent', () => {
    it('Should call AddEvent with correct values', async () => {
      await sut.handle({ headers: { accountId }, body: { name, description } })

      expect(addEvent.perform).toHaveBeenCalledWith({
        userId: accountId,
        name,
        description
      })
    })
  })
})
