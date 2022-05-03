import { Controller, MeController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/decorators'
import { makeLoadAccountByIdService } from '@/main/factories/services'

export const makeMeController = (): Controller => {
  const controller = new MeController(makeLoadAccountByIdService())
  return makePgTransactionController(controller)
}
