import { RequiredValidator, ValidationBuilder } from '@/application/validation'

describe('ValidationBuilder', () => {
  it('Should return a RequiredValidator', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .required()
      .build()

    expect(validators).toEqual([new RequiredValidator('any_value', 'any_name')])
  })
})
