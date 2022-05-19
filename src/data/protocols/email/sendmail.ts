export interface SendEmail {
  send: (params: SendEmail.Params) => Promise<SendEmail.Result>
}

export namespace SendEmail {
  export type Params = { to: string, html?: string, body?: string, subject: string }
  export type Result = Boolean
}
