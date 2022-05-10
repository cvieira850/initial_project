import { Controller, LoadRoleByIdController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/decorators'
import { makeLoadRoleByIdService } from '@/main/factories/services'

export const makeLoadRoleByIdController = (): Controller => {
  const controller = new LoadRoleByIdController(makeLoadRoleByIdService())
  return makePgTransactionController(controller)
}
