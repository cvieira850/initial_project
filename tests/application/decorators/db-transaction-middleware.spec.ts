import { Middleware } from '@/application/middlewares'
import { DbTransactionMiddleware } from '@/application/decorators'
import { DbTransaction } from '@/application/protocols'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DbTransactionMiddleware', () => {
  let db: MockProxy<DbTransaction>
  let decoratee: MockProxy<Middleware>
  let sut: DbTransactionMiddleware

  beforeAll(() => {
    db = mock()
    decoratee = mock()
    decoratee.handle.mockResolvedValue({ statusCode: 204, data: null })
  })

  beforeEach(() => {
    sut = new DbTransactionMiddleware(decoratee, db)
  })

  it('Should open transaction', async () => {
    await sut.handle({ body: { any: 'any' } })

    expect(db.openTransaction).toHaveBeenCalledWith()
    expect(db.openTransaction).toHaveBeenCalledTimes(1)
  })

  it('Should execute decoratee', async () => {
    await sut.handle({ body: { any: 'any' } })

    expect(decoratee.handle).toHaveBeenCalledWith({ body: { any: 'any' } })
    expect(decoratee.handle).toHaveBeenCalledTimes(1)
  })

  it('Should call commit and close transaction on success', async () => {
    await sut.handle({ body: { any: 'any' } })

    expect(db.rollbackTransaction).not.toHaveBeenCalledWith()
    expect(db.commitTransaction).toHaveBeenCalledWith()
    expect(db.commitTransaction).toHaveBeenCalledTimes(1)
    expect(db.closeTransaction).toHaveBeenCalledWith()
    expect(db.closeTransaction).toHaveBeenCalledTimes(1)
  })

  it('Should call rollback and close transaction on failure', async () => {
    decoratee.handle.mockRejectedValueOnce(new Error('decoratee_error'))

    sut.handle({ body: { any: 'any' } }).catch(() => {
      expect(db.commitTransaction).not.toHaveBeenCalledWith()
      expect(db.rollbackTransaction).toHaveBeenCalledWith()
      expect(db.rollbackTransaction).toHaveBeenCalledTimes(1)
      expect(db.closeTransaction).toHaveBeenCalledWith()
      expect(db.closeTransaction).toHaveBeenCalledTimes(1)
    })
  })

  it('Should return same result add decoratee on success', async () => {
    const httpResponse = await sut.handle({ body: { any: 'any' } })

    expect(httpResponse).toEqual({ statusCode: 204, data: null })
  })

  it('Should rethrow if decoratee throws', async () => {
    const error = new Error('decoratee_error')
    decoratee.handle.mockRejectedValueOnce(error)

    const promise = sut.handle({ body: { any: 'any' } })

    await expect(promise).rejects.toThrow(error)
  })
})
