import { Controller } from '@/application/controllers'

import { HttpRequest } from '@/application/helpers'
import { mock, MockProxy } from 'jest-mock-extended'

class DbTransactionController {
  constructor (
    private readonly decoratee: Controller,
    private readonly db: DbTransaction
  ) {}

  async perform (httpRequest: HttpRequest): Promise<void> {
    await this.db.openTransaction()
    try {
      await this.decoratee.perform(httpRequest)
      await this.db.commitTransaction()
      await this.db.closeTransaction()
    } catch {
      await this.db.rollbackTransaction()
      await this.db.closeTransaction()
    }
  }
}

interface DbTransaction {
  openTransaction: () => Promise<void>
  closeTransaction: () => Promise<void>
  commitTransaction: () => Promise<void>
  rollbackTransaction: () => Promise<void>
}

describe('DbTransactionController', () => {
  let db: MockProxy<DbTransaction>
  let decoratee: MockProxy<Controller>
  let sut: DbTransactionController

  beforeAll(() => {
    db = mock()
    decoratee = mock()
  })

  beforeEach(() => {
    sut = new DbTransactionController(decoratee, db)
  })

  it('Should open transaction', async () => {
    await sut.perform({ body: { any: 'any' } })

    expect(db.openTransaction).toHaveBeenCalledWith()
    expect(db.openTransaction).toHaveBeenCalledTimes(1)
  })

  it('Should execute decoratee', async () => {
    await sut.perform({ body: { any: 'any' } })

    expect(decoratee.perform).toHaveBeenCalledWith({ body: { any: 'any' } })
    expect(decoratee.perform).toHaveBeenCalledTimes(1)
  })

  it('Should call commit and close transaction on success', async () => {
    await sut.perform({ body: { any: 'any' } })

    expect(db.rollbackTransaction).not.toHaveBeenCalledWith()
    expect(db.commitTransaction).toHaveBeenCalledWith()
    expect(db.commitTransaction).toHaveBeenCalledTimes(1)
    expect(db.closeTransaction).toHaveBeenCalledWith()
    expect(db.closeTransaction).toHaveBeenCalledTimes(1)
  })

  it('Should call rollback and close transaction on failure', async () => {
    decoratee.perform.mockRejectedValueOnce(new Error('decoratee_error'))

    await sut.perform({ body: { any: 'any' } })

    expect(db.commitTransaction).not.toHaveBeenCalledWith()
    expect(db.rollbackTransaction).toHaveBeenCalledWith()
    expect(db.rollbackTransaction).toHaveBeenCalledTimes(1)
    expect(db.closeTransaction).toHaveBeenCalledWith()
    expect(db.closeTransaction).toHaveBeenCalledTimes(1)
  })
})
