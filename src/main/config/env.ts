import 'dotenv/config'

export const env = {
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'secret',
  host: process.env.HOST ?? 'localhost'
}
