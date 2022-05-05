import { Controller, LoadUserByIdController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/decorators'
import { makeLoadAccountByIdService } from '@/main/factories/services'

export const makeLoadUserByIdController = (): Controller => {
  const controller = new LoadUserByIdController(makeLoadAccountByIdService())
  return makePgTransactionController(controller)
}
