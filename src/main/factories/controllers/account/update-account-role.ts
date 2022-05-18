import { Controller, UpdateAccountRoleController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/decorators'
import { makeUpdateAccountRoleService } from '@/main/factories/services'

export const makeUpdateAccountRoleController = (): Controller => {
  const controller = new UpdateAccountRoleController(makeUpdateAccountRoleService())
  return makePgTransactionController(controller)
}
