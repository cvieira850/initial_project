export interface Account {
  id: string
  name: string
  email: string
  password?: string
  role?: string
  access_token?: string
  reset_password_token?: string
  reset_password_token_expires_at?: Date
}
