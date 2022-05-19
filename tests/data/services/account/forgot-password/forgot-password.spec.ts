import { ForgotPasswordService } from '@/data/services'
import { LoadAccountByEmailRepository } from '@/data/protocols/db'

import { mock, MockProxy } from 'jest-mock-extended'

describe('ForgotPassword Service', () => {
  let sut: ForgotPasswordService
  let accountRepo: MockProxy<LoadAccountByEmailRepository>
  let id: string
  let name: string
  let email: string
  let password: string
  let reset_password_token: string

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    email = 'any_email'
    password = 'any_password'
    reset_password_token = 'any_reset_password_token'
    accountRepo = mock()
    accountRepo.loadByEmail.mockResolvedValue({
      id,
      name,
      email,
      password,
      reset_password_token
    })
  })

  beforeEach(() => {
    sut = new ForgotPasswordService(accountRepo)
  })

  describe('LoadAccountByEmail Repository', () => {
    it('Should call LoadAccountByEmail with correct email', async () => {
      await sut.perform({ email })

      expect(accountRepo.loadByEmail).toHaveBeenCalledWith({ email })
      expect(accountRepo.loadByEmail).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if LoadAccountByEmailRepository throws', async () => {
      accountRepo.loadByEmail.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ email })

      await expect(promise).rejects.toThrow()
    })

    it('Should return undefined if LoadAccountByEmailRepository returns undefined', async () => {
      accountRepo.loadByEmail.mockResolvedValueOnce(undefined)

      const response = await sut.perform({ email })

      expect(response).toBeUndefined()
    })

    it('Should return an account on success', async () => {
      const response = await sut.perform({ email })

      expect(response).toEqual({
        id,
        name,
        email,
        password,
        reset_password_token
      })
    })
  })
})
