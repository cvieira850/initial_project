import { User, Role } from '@/infra/postgres/entities'
import { PgAccountRepository } from '@/infra/postgres/repos'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { PgRepository } from '@/infra/postgres/repos/repository'
import { PgConnection } from '@/infra/postgres/helpers'

import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
describe('AccountPgRepository', () => {
  let sut: PgAccountRepository
  let connection: PgConnection
  let pgRoleRepo: Repository<Role>
  let pgUserRepo: Repository<User>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([Role,User])
    backup = db.backup()
    pgRoleRepo = connection.getRepository(Role)
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
      await pgRoleRepo.save({name: 'user', weight: 1})
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role_id: '1' })

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
      await pgRoleRepo.save({name: 'user', weight: 1})

      await sut.add({ email: 'any_email', name: 'any_name', password: '1234' })
      const pgUser = await pgUserRepo.findOne({ email: 'any_email' })
      expect(pgUser?.id).toBe(1)
    })

    it('Should return an account on success', async () => {
      await pgRoleRepo.save({name: 'user', weight: 1})

      const account = await sut.add({ email: 'any_email', name: 'any_name', password: '1234' })
      const pgUser = await pgUserRepo.findOne({ email: 'any_email' })

      expect(pgUser?.id).toBe(1)
      expect(account).toEqual({ id: '1', name: 'any_name', email: 'any_email' })
    })
  })

  describe('updateAccessToken() ', () => {
    it('Should return an account on updateAccessToken success', async () => {
      await pgRoleRepo.save({name: 'user', weight: 1})
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role_id: '1' })
      await pgUserRepo.findOne({ email: 'any_email' })

      const updatedUser = await sut.updateAccessToken({ id: '1', accessToken: 'any_token' })
      expect(updatedUser).toEqual({ id: '1', name: 'any_name', email: 'any_email', access_token: 'any_token' })
    })
  })

  describe('LoadAccountByToken', () => {
    it('Should return an account lo loadAccountByToken without role', async () => {
      await pgRoleRepo.save({name: 'user', weight: 1})
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role_id: '1', access_token: 'any_token' })

      const user = await sut.loadByToken({ accessToken: 'any_token' })

      expect(user).toEqual({ id: '1', name: 'any_name', role: 'user', email: 'any_email', password: '1234', access_token: 'any_token' })
    })

    it('Should return an account on loadAccountByToken with role', async () => {
      await pgRoleRepo.save({name: 'user', weight: 1})
      await pgUserRepo.save({ email: 'any_email',name: 'any_name',  role_id: '1', password: '1234', access_token: 'any_token' })
      const user = await sut.loadByToken({ accessToken: 'any_token', role: 'user' })

      expect(user).toEqual({ id: '1', role: 'user',name: 'any_name',  email: 'any_email', password: '1234', access_token: 'any_token' })
    })

    it('Should return undefined on loadAccountByToken with role admin on account role user', async () => {
      await pgRoleRepo.save({name: 'user', weight: 1})
      await pgRoleRepo.save({name: 'admin', weight: 5})
      await pgUserRepo.save({ email: 'any_email',name: 'any_name', role_id: '1', password: '1234', access_token: 'any_token' })

      const user = await sut.loadByToken({ accessToken: 'any_token', role: 'admin' })

      expect(user).toBeUndefined()
    })

    it('Should return an account on loadAccountByToken with role user on account role admin', async () => {
      await pgRoleRepo.save({name: 'user', weight: 1})
      await pgRoleRepo.save({name: 'admin', weight: 5})
      await pgUserRepo.save({ email: 'any_email',name: 'any_name' , role_id: '2', password: '1234', access_token: 'any_token' })

      const user = await sut.loadByToken({ accessToken: 'any_token', role: 'user' })

      expect(user).toEqual({ id: '1',name: 'any_name' , role: 'admin', email: 'any_email', password: '1234', access_token: 'any_token' })
    })

    it('Should return an account on loadAccountByToken with role admin on account role sysAdmin', async () => {
      await pgRoleRepo.save({name: 'user', weight: 1})
      await pgRoleRepo.save({name: 'admin', weight: 5})
      await pgRoleRepo.save({name: 'sysAdmin', weight: 10})
      await pgUserRepo.save({ email: 'any_email',name: 'any_name' , role_id: '3', password: '1234', access_token: 'any_token' })

      const user = await sut.loadByToken({ accessToken: 'any_token', role: 'user' })

      expect(user).toEqual({ id: '1',name: 'any_name' , role: 'sysAdmin', email: 'any_email', password: '1234', access_token: 'any_token' })
    })
  });

  describe('loadById', () => {
    it('Should return an account on loadById', async () => {
      await pgRoleRepo.save({name: 'user', weight: 1})
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role_id: '1' })

      const user = await sut.loadById({ id: '1' })

      expect(user).toEqual({ id: '1', name: 'any_name', role: 'user', email: 'any_email', "access_token": null })
    })

    it('Should return undefined if loadById dont return a user', async () => {
      const user = await sut.loadById({ id: '1' })

      expect(user).toBeUndefined()
    })
  })

  describe('UpdateAccountRole', () => {
    it('Should return an account on updateAccountRole', async () => {
      await pgRoleRepo.save({name: 'user', weight: 1})
      await pgRoleRepo.save({name: 'admin', weight: 2})
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role_id: '1' })

      const user = await sut.updateAccountRole({ id: '1', roleId: '2' })

      expect(user).toEqual({ id: '1', name: 'any_name', role: 'admin', email: 'any_email' })
    })
  });
})
