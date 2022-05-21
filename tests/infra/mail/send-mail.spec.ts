import { SendEmailNodeMailer } from '@/infra/email'

import nodemailer from 'nodemailer'
import { mocked } from 'jest-mock'

jest.mock('nodemailer', () => ({
  createTransport: jest.fn()
}))

describe('SendMail', () => {
  let sut: SendEmailNodeMailer
  let createTransportSpy: jest.Mock

  beforeAll(() => {
    createTransportSpy = jest.fn().mockReturnValue({
      sendMail: jest.fn().mockResolvedValue(null)
    })
    mocked(nodemailer.createTransport).mockImplementation(createTransportSpy)
  })
  beforeEach(() => {
    sut = new SendEmailNodeMailer()
  })

  describe('Send', () => {
    it('should call nodemailer once', async () => {
      const fakeParams = {
        to: 'any_to',
        subject: 'any_subject',
        html: 'any_html'
      }
      await sut.send(fakeParams)

      expect(createTransportSpy).toHaveBeenCalledTimes(1)
    })

    it('should return true if nodemailer returns null', async () => {
      const fakeParams = {
        to: 'any_to',
        subject: 'any_subject',
        html: 'any_html'
      }

      const response = await sut.send(fakeParams)

      expect(response).toBeTruthy()
    })

    it('should return false if nodemailer returns error', async () => {
      const fakeParams = {
        to: 'any_to',
        subject: 'any_subject',
        html: 'any_html'
      }
      createTransportSpy.mockReturnValueOnce({
        sendMail: jest.fn().mockRejectedValueOnce(new Error())
      })

      const response = await sut.send(fakeParams)

      expect(response).toBeFalsy()
    })
  })
})
