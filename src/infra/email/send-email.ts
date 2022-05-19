import { SendEmail } from '@/data/protocols/email'

import nodemailer from 'nodemailer'

export class SendEmailNodeMailer implements SendEmail {
  async send (params: SendEmail.Params): Promise<SendEmail.Result> {
    const mailTransporter = nodemailer.createTransport({
      host: process.env.HOST_EMAIL,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASSWORD
      }
    })
    try {
      await mailTransporter.sendMail({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        from: `"${process.env.MAIL_SENDER}"`,
        to: params.to,
        subject: params.subject,
        html: params.html
      })

      return true
    } catch (e) {
      return false
    }
  }
}
