import { Validator, RequiredStringValidator } from '@/application/validation'
import { CompareFieldsValidation } from './compare-fields-validation'
import { EmailValidation } from './email-validation'
import { EmailValidatorAdapter } from './email-validator-adapter'
import { StringValidator } from './string'

export class ValidationBuilder {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: {value: string, fieldName: string}): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(this.value, this.fieldName))
    return this
  }

  string (): ValidationBuilder {
    this.validators.push(new StringValidator(this.value, this.fieldName))
    return this
  }

  validateEmail (): ValidationBuilder {
    this.validators.push(new EmailValidation(this.value, this.fieldName, new EmailValidatorAdapter()))
    return this
  }

  validateCompareFields (fieldNameToCompare: string): ValidationBuilder {
    this.validators.push(new CompareFieldsValidation(this.value, this.fieldName, fieldNameToCompare))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
