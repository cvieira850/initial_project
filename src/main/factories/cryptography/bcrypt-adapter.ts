import { BcryptAdapter } from '@/infra/cryptography'

export const makeBcryptAdapter = (): BcryptAdapter => {
  const salt = 12
  return new BcryptAdapter(salt)
}
