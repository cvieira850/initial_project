import { RequiredFieldError } from '@/application/errors'
import { RequiredValidator } from '@/application/validation'

describe('RequiredValidator', () => {
  it('Should return RequiredFieldError if value is empty', () => {
    const sut = new RequiredValidator('', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('Should return RequiredFieldError if value is null', () => {
    const sut = new RequiredValidator(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('Should return RequiredFieldError if value is undefined', () => {
    const sut = new RequiredValidator(undefined as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('Should return undefined if value is not empty', () => {
    const sut = new RequiredValidator('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
