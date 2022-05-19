import { SendEmail, LoadAccountByEmailRepository, Signup, Hash, AddAccountRepository, Encrypt, UpdateAccessTokenRepository } from './signup-protocols'

export class SignupService implements Signup {
  constructor (
    private readonly accountRepo: LoadAccountByEmailRepository & AddAccountRepository & UpdateAccessTokenRepository,
    private readonly hash: Hash,
    private readonly encrypt: Encrypt,
    private readonly sendEmail: SendEmail
  ) {}

  public perform = async ({ email, name, password }: Signup.Params): Promise<Signup.Result> => {
    const account = await this.accountRepo.loadByEmail({ email })
    if (!account) {
      const hashedPassword = await this.hash.hash({ plaintext: password })
      if (hashedPassword) {
        const accountLoaded = await this.accountRepo.add({ email, name, password: hashedPassword })
        if (accountLoaded) {
          const accessToken = await this.encrypt.encrypt({ plaintext: accountLoaded.id })
          const updatedAccount = await this.accountRepo.updateAccessToken({ id: accountLoaded.id, accessToken })
          if (updatedAccount) {
            const result = await this.sendEmail.send({
              to: updatedAccount.email,
              html: `
                <!DOCTYPE html>
                <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Bem vindo ${updatedAccount.name}!</title>
                </head>
                <body>
                    <div style="padding:32px; max-width: 735px;">
                        <h1>Seja bem vindo ${updatedAccount.name}</h1>
                    </div>
                </body>
                </html>
              `,
              subject: 'Bem vindo!'
            })
            if (result) {
              return {
                accessToken
              }
            }
          }
        }
      }
    }
    return undefined
  }
}
