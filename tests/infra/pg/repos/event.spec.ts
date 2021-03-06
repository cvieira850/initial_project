import { PgEventRepository } from '@/infra/pg/repos'
import { Role, Event, User } from '@/infra/pg/entities'
import { PgConnection } from '@/infra/pg/helpers'
import { makeFakeDb } from '../mocks'
import { PgRepository } from '@/infra/pg/repos/repository'

import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'

describe('PgEventRepository', () => {
  let sut: PgEventRepository
  let connection: PgConnection
  let pgRoleRepo: Repository<Role>
  let pgUserRepo: Repository<User>
  let pgEventRepo: Repository<Event>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb()
    backup = db.backup()
    pgRoleRepo = connection.getRepository(Role)
    pgUserRepo = connection.getRepository(User)
    pgEventRepo = connection.getRepository(Event)
  })
  beforeEach(() => {
    backup.restore()
    sut = new PgEventRepository()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })
  describe('LoadEventByNameRepository', () => {
    it('Should return an event on loadByName success', async () => {
      await pgRoleRepo.save({ name: 'user', weight: 1 })
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role_id: '1' })
      await pgEventRepo.save({ name: 'any_name', user_id: '1', description: 'any_description' })

      const event = await sut.loadByName({ userId: '1', name: 'any_name' })

      expect(event).toEqual({ id: '1', name: 'any_name', user_id: '1', description: 'any_description', created_at: expect.any(Date) })
    })

    it('Should return undefined if loadByName fails', async () => {
      const event = await sut.loadByName({ userId: '1', name: 'any_name' })

      expect(event).toBeUndefined()
    })
  })

  describe('AddEventRepository', () => {
    it('Should return an event on add success', async () => {
      await pgRoleRepo.save({ name: 'user', weight: 1 })
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role_id: '1' })

      const event = await sut.add({ name: 'any_name', description: 'any_description', userId: '1' })

      expect(event).toEqual({ id: '1', name: 'any_name', user_id: '1', description: 'any_description', created_at: expect.any(Date) })
    })
  })

  describe('LoadEventByIdRepository', () => {
    it('Should return an event on loadById', async () => {
      await pgRoleRepo.save({ name: 'user', weight: 1 })
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role_id: '1' })
      await pgEventRepo.save({ name: 'any_name', user_id: '1', description: 'any_description' })

      const event = await sut.loadById({ id: '1' })

      expect(event).toEqual({ id: '1', name: 'any_name', user_id: '1', description: 'any_description', created_at: expect.any(Date) })
    })

    it('Should return undefined if loadById dont return an event', async () => {
      const event = await sut.loadById({ id: '1' })

      expect(event).toBeUndefined()
    })
  })
})
