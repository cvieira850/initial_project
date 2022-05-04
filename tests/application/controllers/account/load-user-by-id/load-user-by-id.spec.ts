import { Controller, LoadUserByIdController } from '@/application/controllers'
import { RequiredStringValidator, StringValidator } from '@/application/validation'
import { LoadAccountById } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadUserByIdController', () => {
  let sut: LoadUserByIdController
  let loadAccountById: MockProxy<LoadAccountById>
  let userId: string
  let name: string
  let email: string
  let role: string
  let accessToken: string

  beforeAll(() => {
    userId = 'any_id'
    loadAccountById = mock()
    loadAccountById.perform.mockResolvedValue({
      id: userId,
      name,
      email,
      role,
      access_token: accessToken
    })
  })

  beforeEach(() => {
    sut = new LoadUserByIdController(loadAccountById)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ params: { userId } })

    expect(validators).toEqual([
      new RequiredStringValidator(userId, 'userId'),
      new StringValidator(userId, 'userId')
    ])
  })

  describe('LoadUserById', () => {
    it('Should call LoadAccountById with correct values', async () => {
      await sut.handle({ params: { userId } })

      expect(loadAccountById.perform).toHaveBeenCalledWith({ id: userId })
      expect(loadAccountById.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 201 if LoadAccountById fails', async () => {
      loadAccountById.perform.mockResolvedValueOnce(undefined)

      const httpResponse = await sut.handle({ params: { userId } })

      expect(httpResponse).toEqual({
        statusCode: 201,
        data: null
      })
    })
  })
})
