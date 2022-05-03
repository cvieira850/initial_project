import { MeController } from '@/application/controllers'
import { RequiredStringValidator, StringValidator } from '@/application/validation'
import { LoadAccountById } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Me Controller', () => {
  let sut: MeController
  let loadAccountById: MockProxy<LoadAccountById>
  let accountId: string
  let name: string
  let email: string
  let role: string
  let accessToken: string

  beforeAll(() => {
    accountId = 'any_id'
    name = 'any_name'
    email = 'any_email'
    role = 'any_role'
    accessToken = 'any_token'
    loadAccountById = mock()
    loadAccountById.perform.mockResolvedValue({
      id: accountId,
      name,
      email,
      role,
      access_token: accessToken
    })
  })
  beforeEach(() => {
    sut = new MeController(loadAccountById)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ headers: { accountId: 'any_id' } })

    expect(validators).toEqual([
      new RequiredStringValidator(accountId, 'accountId'),
      new StringValidator(accountId, 'accountId')
    ])
  })

  describe('LoadById', () => {
    it('Should call LoadAccountById with correct values', async () => {
      await sut.handle({ headers: { accountId } })

      expect(loadAccountById.perform).toHaveBeenCalledWith({ id: accountId })
      expect(loadAccountById.perform).toHaveBeenCalledTimes(1)
    })

    it('Should return 403 if LoadAccountById fails', async () => {
      loadAccountById.perform.mockResolvedValueOnce(undefined)

      const httpResponse = await sut.handle({ headers: { accountId } })

      expect(httpResponse).toEqual({
        statusCode: 201,
        data: null
      })
    })
  })
})
