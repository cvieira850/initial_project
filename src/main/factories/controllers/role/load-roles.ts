import { LoadRolesController, Controller } from '@/application/controllers'
import { makeLoadRolesService } from '@/main/factories/services'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeLoadRolesController = (): Controller => {
  const controller = new LoadRolesController(makeLoadRolesService())
  return makePgTransactionController(controller)
}
