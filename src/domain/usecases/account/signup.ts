export interface Signup {
  perform: (params: Signup.Params) => Promise<Signup.Result>
}

export namespace Signup {
  export type Params = {
    email: string
    name: string
    password: string
  }

  export type Result = { accessToken: string } | undefined
}
