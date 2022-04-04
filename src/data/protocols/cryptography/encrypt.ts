export interface Encrypt {
  encrypt: (params: Encrypt.Params) => Promise<Encrypt.Result>
}

export namespace Encrypt {
  export type Params = {
    plaintext: string
  }

  export type Result = string
}
