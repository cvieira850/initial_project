import { Controller, ResetPasswordController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/decorators'
import { makeResetPasswordService } from '@/main/factories/services'

export const makeResetPasswordController = (): Controller => {
  const controller = new ResetPasswordController(makeResetPasswordService())
  return makePgTransactionController(controller)
}
