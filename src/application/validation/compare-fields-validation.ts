import { InvalidParamError } from '@/application/errors'
import { Validator } from './validator'

export class CompareFieldsValidation implements Validator {
  constructor (
    private readonly field: string,
    private readonly fieldNameToCompare: string,
    private readonly fieldToCompare: string
  ) {}

  validate (): Error | undefined {
    if (this.field !== this.fieldToCompare) {
      return new InvalidParamError(this.fieldNameToCompare)
    }
  }
}
