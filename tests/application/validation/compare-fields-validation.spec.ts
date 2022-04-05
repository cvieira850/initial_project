import { CompareFieldsValidation } from '@/application/validation'
import { InvalidParamError } from '@/application/errors'

describe('CompareFields Validation', () => {
  let field: string
  beforeEach(() => {
    field = 'any_value'
  })
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = new CompareFieldsValidation(field, 'fieldToCompare', 'any_value2')

    const error = sut.validate()

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new CompareFieldsValidation(field, 'fieldToCompare', field)
    const error = sut.validate()
    expect(error).toBeFalsy()
  })
})
