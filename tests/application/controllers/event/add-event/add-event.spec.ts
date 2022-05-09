import { Controller, AddEventController } from '@/application/controllers'
import { AddEvent } from '@/domain/usecases'
import { RequiredValidator, StringValidator } from '@/application/validation'

import { mock, MockProxy } from 'jest-mock-extended'
import { UnauthorizedError } from '@/application/errors'

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
      new RequiredValidator(accountId, 'accountId'),
      new StringValidator(accountId, 'accountId'),
      new RequiredValidator(name, 'name'),
      new StringValidator(name, 'name'),
      new RequiredValidator(description, 'description'),
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

    it('Should return 401 if AddEvent fails', async () => {
      addEvent.perform.mockResolvedValueOnce(undefined)

      const httpResponse = await sut.handle({ headers: { accountId }, body: { name, description } })

      expect(httpResponse).toEqual({
        statusCode: 401,
        data: new UnauthorizedError()
      })
    })
    it('Should return 200 if AddEvent succeeds', async () => {
      const httpResponse = await sut.handle({ headers: { accountId }, body: { name, description } })

      expect(httpResponse).toEqual({
        statusCode: 200,
        data: {
          id: accountId,
          name,
          description,
          user_id: accountId,
          created_at: expect.any(Date)
        }
      })
    })
  })
})
