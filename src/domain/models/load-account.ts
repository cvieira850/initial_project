export interface LoadAccount {
  id: string
  name: string
  email: string
  password: string
  access_token?: string
  reset_password_token?: string
  reset_password_token_expires_at?: Date
}
