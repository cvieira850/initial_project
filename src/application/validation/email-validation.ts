import { Validator } from '@/application/validation'
import { InvalidParamError } from '@/application/errors'

export class EmailValidation implements Validator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (): Error | undefined {
    const isValid = this.emailValidator.isValid(this.value)
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
export interface EmailValidator {
  isValid: (email: string) => boolean
}
