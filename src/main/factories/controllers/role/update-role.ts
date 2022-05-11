import { UpdateRoleController, Controller } from '@/application/controllers'
import { makeUpdateRoleService } from '@/main/factories/services'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeUpdateRoleController = (): Controller => {
  const controller = new UpdateRoleController(makeUpdateRoleService())
  return makePgTransactionController(controller)
}
