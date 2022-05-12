import { Controller, DeleteRoleController } from '@/application/controllers'
import { RequiredValidator, StringValidator } from '@/application/validation'
import { DeleteRole } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeleteRole Controller', () => {
  let sut: DeleteRoleController
  let usecase: MockProxy<DeleteRole>
  let roleId: string

  beforeAll(() => {
    roleId = 'any_id'
    usecase = mock()
    usecase.perform.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new DeleteRoleController(usecase)
  })

  it('Should be an instance of Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({
      params: { roleId }
    })

    expect(validators).toEqual([
      new RequiredValidator(roleId, 'roleId'),
      new StringValidator(roleId, 'roleId')
    ])
  })

  describe('DeleteRole Usecase', () => {
    it('Should call the DeleteRole with correct params', async () => {
      await sut.handle({ params: { roleId } })

      expect(usecase.perform).toHaveBeenCalledWith({ id: roleId })
      expect(usecase.perform).toHaveBeenCalledTimes(1)
    })
  })
})
