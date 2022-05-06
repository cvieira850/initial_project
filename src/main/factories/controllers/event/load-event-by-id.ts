import { Controller, LoadEventByIdController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/decorators'
import { makeLoadEventByIdService } from '@/main/factories/services'

export const makeLoadEventByIdController = (): Controller => {
  const controller = new LoadEventByIdController(makeLoadEventByIdService())
  return makePgTransactionController(controller)
}
