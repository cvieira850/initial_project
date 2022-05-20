import { Controller, ForgotPasswordController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/decorators'
import { makeForgotPasswordService } from '@/main/factories/services'

export const makeForgotPasswordController = (): Controller => {
  const controller = new ForgotPasswordController(makeForgotPasswordService())
  return makePgTransactionController(controller)
}
