import { ForgotPasswordService } from '@/data/services'
import { LoadAccountByEmailRepository, UpdateResetPasswordTokenRepository } from '@/data/protocols/db'
import { SendEmailNodeMailer } from '@/infra/email'
import { Encrypt } from '@/data/protocols/cryptography'

import { mock, MockProxy } from 'jest-mock-extended'

describe('ForgotPassword Service', () => {
  let sut: ForgotPasswordService
  let accountRepo: MockProxy<LoadAccountByEmailRepository & UpdateResetPasswordTokenRepository>
  let sendEmail: MockProxy<SendEmailNodeMailer>
  let encrypt: MockProxy<Encrypt>
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
    accountRepo.updateResetPasswordToken.mockResolvedValue({
      id,
      name,
      email,
      password,
      reset_password_token
    })
    sendEmail = mock()
    sendEmail.send.mockResolvedValue(true)
    encrypt = mock()
    encrypt.encrypt.mockResolvedValue(reset_password_token)
  })

  beforeEach(() => {
    sut = new ForgotPasswordService(accountRepo, sendEmail, encrypt)
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

  describe('Encrypt', () => {
    it('Should call Encrypt with valid id once', async () => {
      await sut.perform({ email })

      expect(encrypt.encrypt).toHaveBeenCalledWith({ plaintext: id + name })
      expect(encrypt.encrypt).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if Encrypt throws', async () => {
      encrypt.encrypt.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ email })

      await expect(promise).rejects.toThrow(new Error())
    })
  })

  describe('UpdateResetPasswordToken Repository', () => {
    it('Should call UpdateResetPasswordTokenRepository with correct values', async () => {
      await sut.perform({ email })

      expect(accountRepo.updateResetPasswordToken).toHaveBeenCalledWith({
        id,
        token: reset_password_token
      })
      expect(accountRepo.updateResetPasswordToken).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if UpdateResetPasswordTokenRepository throws', async () => {
      accountRepo.updateResetPasswordToken.mockRejectedValueOnce(new Error())

      const promise = sut.perform({ email })

      await expect(promise).rejects.toThrow()
    })
  })
  describe('Send Email', () => {
    it('Should call sendEmail with valid id once', async () => {
      await sut.perform({ email })

      expect(sendEmail.send).toHaveBeenCalledTimes(1)
    })

    it('Should return undefined if sendEmail return false', async () => {
      sendEmail.send.mockResolvedValueOnce(false)

      const response = await sut.perform({ email })

      expect(response).toBeUndefined()
    })
  })
})
