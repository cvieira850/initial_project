import { EmailValidation, EmailValidator } from '@/application/validation'
import { InvalidParamError } from '@/application/errors'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

export class EmailValidatorSpy implements EmailValidator {
  result= true
  email?: string
  isValid (email: string): boolean {
    this.email = email
    return this.result
  }
}

const makeSut = (value: string): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(value, 'email', emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('Email Validation', () => {
  it('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut('teste')
    emailValidatorSpy.result = false
    const error = sut.validate()
    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut('teste')
    sut.validate()
    expect(emailValidatorSpy.email).toBe('teste')
  })

  it('Should throw if EmailValidator throws ', () => {
    const { sut, emailValidatorSpy } = makeSut('teste')
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })

  it('Should not return if EmailValidator succeeds', () => {
    const { sut } = makeSut('teste@teste.com')
    const error = sut.validate()
    expect(error).toBeFalsy()
  })
})
