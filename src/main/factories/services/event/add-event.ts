import { makePgEventRepository } from '@/main/factories/infra/repos'
import { AddEventService } from '@/data/services'

export const makeAddEventService = (): AddEventService => {
  return new AddEventService(makePgEventRepository())
}
