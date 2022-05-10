import { LoadRoleByIdService } from '@/data/services'

describe('LoadRoleByIdService', () => {
  let sut: LoadRoleByIdService

  beforeEach(() => {
    sut = new LoadRoleByIdService()
  })

  it('Should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('Should be instance of LoadRoleByIdService', () => {
    expect(sut).toBeInstanceOf(LoadRoleByIdService)
  })
})
