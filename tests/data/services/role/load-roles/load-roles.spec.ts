import { LoadRolesService } from '@/data/services'

describe('LoadRoles Service', () => {
  let sut: LoadRolesService

  beforeEach(() => {
    sut = new LoadRolesService()
  })

  it('Should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('Should be a class', () => {
    expect(typeof LoadRolesService).toBe('function')
  })

  it('Should instantiate', () => {
    expect(sut instanceof LoadRolesService).toBe(true)
  })

  it('Should have a perform method', () => {
    expect(sut.perform).toBeDefined()
  })

  it('Should implement the perform method', () => {
    expect(typeof sut.perform).toBe('function')
  })
})
