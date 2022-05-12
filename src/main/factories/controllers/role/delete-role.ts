import { DeleteRoleController, Controller } from '@/application/controllers'
import { makeDeleteRoleService } from '@/main/factories/services'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeDeleteRoleController = (): Controller => {
  const controller = new DeleteRoleController(makeDeleteRoleService())
  return makePgTransactionController(controller)
}
