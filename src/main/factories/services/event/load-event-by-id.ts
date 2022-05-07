import { makePgEventRepository } from '@/main/factories/infra/repos'
import { LoadEventByIdService } from '@/data/services'

export const makeLoadEventByIdService = (): LoadEventByIdService => {
  return new LoadEventByIdService(makePgEventRepository())
}
