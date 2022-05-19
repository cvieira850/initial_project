import { SendEmailNodeMailer } from '@/infra/email'

export const makeSendEmailNodeMailer = (): SendEmailNodeMailer => {
  return new SendEmailNodeMailer()
}
