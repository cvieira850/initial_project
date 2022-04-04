import { LoadAccountByEmailRepository } from '@/data/protocols/db'
import { SignupService } from '@/data/services/account/signup/signup'

import { mock, MockProxy } from 'jest-mock-extended'

describe('SignupService', () => {
  let sut: SignupService
  let loadAccountByEmailRepository: MockProxy<LoadAccountByEmailRepository>
  let email: string
  let name: string
  let password: string

  beforeAll(() => {
    email = 'any_email'
    name = 'any_name'
    password = 'any_password'
    loadAccountByEmailRepository = mock()
    loadAccountByEmailRepository.loadByEmail.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new SignupService(loadAccountByEmailRepository)
  })

  describe('LoadAccountByEmail Repository', () => {
    it('Should call LoadAccountByEmail with correct email', async () => {
      await sut.perform({ email, name, password })

      expect(loadAccountByEmailRepository.loadByEmail).toHaveBeenCalledWith(email)
      expect(loadAccountByEmailRepository.loadByEmail).toHaveBeenCalledTimes(1)
    })
  })
})
