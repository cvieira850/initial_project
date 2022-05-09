import { AddRoleController, Controller } from '@/application/controllers'
import { makeAddRoleService } from '@/main/factories/services'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeAddRoleController = (): Controller => {
  const controller = new AddRoleController(makeAddRoleService())
  return makePgTransactionController(controller)
}
