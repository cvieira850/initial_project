/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Encrypt, SendEmail, ForgotPassword, LoadAccountByEmailRepository, UpdateResetPasswordTokenRepository } from './forgot-password-protocols'

export class ForgotPasswordService implements ForgotPassword {
  constructor (
    private readonly accountRepo: LoadAccountByEmailRepository & UpdateResetPasswordTokenRepository,
    private readonly sendEmail: SendEmail,
    private readonly encrypt: Encrypt
  ) {}

  async perform (params: ForgotPassword.Params): Promise<ForgotPassword.Result> {
    const account = await this.accountRepo.loadByEmail({ email: params.email })
    if (account) {
      const token = await this.encrypt.encrypt({ plaintext: account.id + account.name })
      const updatedAccount = await this.accountRepo.updateResetPasswordToken({
        id: account.id,
        token
      })
      if (updatedAccount) {
        const result = await this.sendEmail.send({
          to: account.email,
          html: `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recuperação de senha</title>
        </head>
        <body>
            <div style="padding:32px; max-width: 735px;">
                <h1>Olá ${updatedAccount.name}</h1>
                <p>Você solicitou uma recuperação de senha, clique no link abaixo para criar uma nova senha.</p>
                <a href="http://localhost:3000/reset-password?token=${updatedAccount.reset_password_token}">Recuperar senha</a>
            </div>
        </body>
        </html>
      `,
          subject: 'Recuperação de senha'
        })
        if (result) {
          return account
        }
      }
    }
  }
}
