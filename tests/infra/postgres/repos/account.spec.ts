import { User } from '@/infra/postgres/entities'
import { PgAccountRepository } from '@/infra/postgres/repos'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { PgRepository } from '@/infra/postgres/repos/repository'
import { PgConnection } from '@/infra/postgres/helpers'

import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
describe('AccountPgRepository', () => {
  let sut: PgAccountRepository
  let connection: PgConnection
  let pgUserRepo: Repository<User>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([User])
    backup = db.backup()
    pgUserRepo = connection.getRepository(User)
  })
  beforeEach(() => {
    backup.restore()
    sut = new PgAccountRepository()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('loadByEmail', () => {
    it('Should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role: 'any_role' })

      const account = await sut.loadByEmail({ email: 'any_email' })

      expect(account).toEqual({ id: '1',  name: 'any_name', email: 'any_email', password: '1234' })
    })

    it('Should return undefined if email does not exists', async () => {
      const account = await sut.loadByEmail({ email: 'any_email' })

      expect(account).toBeUndefined()
    })
  })

  describe('add', () => {
    it('Should create an account', async () => {
      await sut.add({ email: 'any_email', name: 'any_name', password: '1234' })
      const pgUser = await pgUserRepo.findOne({ email: 'any_email' })
      expect(pgUser?.id).toBe(1)
    })

    it('Should return an account on success', async () => {
      const account = await sut.add({ email: 'any_email', name: 'any_name', password: '1234' })
      const pgUser = await pgUserRepo.findOne({ email: 'any_email' })

      expect(pgUser?.id).toBe(1)
      expect(account).toEqual({ id: '1', name: 'any_name', email: 'any_email' })
    })
  })

  describe('updateAccessToken() ', () => {
    it('Should return an account on updateAccessToken success', async () => {
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role: 'user' })
      await pgUserRepo.findOne({ email: 'any_email' })

      const updatedUser = await sut.updateAccessToken({ id: '1', accessToken: 'any_token' })
      expect(updatedUser).toEqual({ id: '1', name: 'any_name', email: 'any_email', access_token: 'any_token' })
    })
  })

  describe('LoadAccountByToken', () => {
    it('Should return an account lo loadAccountByToken without role', async () => {
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role: 'user', access_token: 'any_token' })

      const user = await sut.loadByToken({ accessToken: 'any_token' })

      expect(user).toEqual({ id: '1', name: 'any_name', role: 'user', email: 'any_email', password: '1234', access_token: 'any_token' })
    })

    it('Should return an account on loadAccountByToken with role', async () => {
      await pgUserRepo.save({ email: 'any_email',name: 'any_name',  role: 'user', password: '1234', access_token: 'any_token' })
      const user = await sut.loadByToken({ accessToken: 'any_token', role: 'user' })

      expect(user).toEqual({ id: '1', role: 'user',name: 'any_name',  email: 'any_email', password: '1234', access_token: 'any_token' })
    })
  });
})
