import { InvalidParamError } from '@/application/errors'
import { Validator } from './validator'

export class NumberValidator implements Validator {
  constructor (
    private readonly value: any,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (typeof this.value !== 'number') {
      return new InvalidParamError(this.fieldName)
    }
  }
}
