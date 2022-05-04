import { AddEventController, Controller } from '@/application/controllers'
import { makeAddEventService } from '@/main/factories/services'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeAddEventController = (): Controller => {
  const controller = new AddEventController(makeAddEventService())
  return makePgTransactionController(controller)
}
