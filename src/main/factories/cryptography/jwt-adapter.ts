import { JwtAdapter } from '@/infra/cryptography'

export const makeJwtAdapter = (): JwtAdapter => {
  return new JwtAdapter(process.env.JWT_SECRET ?? 'secret')
}
