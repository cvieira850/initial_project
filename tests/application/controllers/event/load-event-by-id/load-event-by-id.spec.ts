import { LoadEventByIdController, Controller } from '@/application/controllers'
import { RequiredValidator, StringValidator } from '@/application/validation'
import { LoadEventById } from '@/domain/usecases'
import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadEventByIdController', () => {
  let sut: LoadEventByIdController
  let loadEventById: MockProxy<LoadEventById>
  let eventId: string
  let name: string
  let description: string
  let created_at: Date
  let user_id: string

  beforeAll(() => {
    eventId = 'any_id'
    name = 'any_name'
    description = 'any_descript'
    created_at = new Date()
    user_id = 'any_user_id'
    loadEventById = mock()
    loadEventById.perform.mockResolvedValue({
      id: eventId,
      name,
      description,
      user_id,
      created_at
    })
  })

  beforeEach(() => {
    sut = new LoadEventByIdController(loadEventById)
  })
  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build validators correctly', () => {
    const validators = sut.buildValidators({
      params: { eventId }
    })

    expect(validators).toEqual([
      new RequiredValidator(eventId, 'eventId'),
      new StringValidator(eventId, 'eventId')
    ])
  })

  describe('LoadEventById usecase', () => {
    it('Should call LoadUserById with correct values', async () => {
      await sut.handle({ params: { eventId } })

      expect(loadEventById.perform).toHaveBeenCalledWith({ id: eventId })
      expect(loadEventById.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 201 if LoadUserById fails', async () => {
      loadEventById.perform.mockResolvedValueOnce(undefined)

      const httpResponse = await sut.handle({ params: { eventId } })

      expect(httpResponse).toEqual({
        statusCode: 201,
        data: null
      })
    })

    it('Should return 200 if LoadUserById succeeds', async () => {
      const httpResponse = await sut.handle({ params: { eventId } })

      expect(httpResponse).toEqual({
        statusCode: 200,
        data: {
          id: eventId,
          name,
          description,
          user_id,
          created_at: expect.any(Date)
        }
      })
    })
  })
})
