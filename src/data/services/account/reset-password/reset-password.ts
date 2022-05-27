import { ResetPassword, LoadAccountByResetTokenRepository, Hash, UpdatePasswordRepository, SendEmail } from './reset-password-protocols'
import { InvalidRequestError } from '@/data/errors'

export class ResetPasswordService implements ResetPassword {
  constructor (
    private readonly accountRepo: LoadAccountByResetTokenRepository & UpdatePasswordRepository,
    private readonly hash: Hash,
    private readonly sendEmail: SendEmail
  ) {}

  async perform (params: ResetPassword.Params): Promise<ResetPassword.Result> {
    const account = await this.accountRepo.loadByResetToken({ token: params.token })
    if (!account) {
      throw new InvalidRequestError('Account not found')
    }
    const hashedPassword = await this.hash.hash({ plaintext: params.password })
    if (hashedPassword) {
      const updatedAccount = await this.accountRepo.updatePassword({ id: account.id, password: hashedPassword })
      if (updatedAccount) {
        await this.sendEmail.send({
          to: account.email,
          html: `
          <!DOCTYPE html>
          <html lang="pt-br">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Reset de senha</title>
          </head>
          <body>
              <div style="padding:32px; max-width: 735px;">
                  <h1>Olá ${account.name}</h1>
                  <p>Sua senha foi alterada com sucesso.</p>
              </div>
          </body>
          </html>
        `,
          subject: 'Reset de senha'
        })
      }
    }
    return undefined
  }
}
