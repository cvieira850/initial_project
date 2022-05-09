import { PgRoleRepository } from "@/infra/postgres/repos"
import { Role } from "@/infra/postgres/entities"
import { PgConnection } from "@/infra/postgres/helpers"
import { makeFakeDb } from "../mocks"
import { PgRepository } from "@/infra/postgres/repos/repository"

import { IBackup } from "pg-mem"
import { Repository } from "typeorm"



describe('PgRoleRepository', () => {
  let sut: PgRoleRepository
    let connection: PgConnection
    let pgRoleRepo: Repository<Role>
    let backup: IBackup

    beforeAll(async () => {
      connection = PgConnection.getInstance()
      const db = await makeFakeDb()
      backup = db.backup()
      pgRoleRepo = connection.getRepository(Role)
    })
    beforeEach(() => {
      backup.restore()
      sut = new PgRoleRepository()
    })

    afterAll(async () => {
      await connection.disconnect()
    })

    it('Should be an instance of PgRepository', () => {
      expect(sut).toBeInstanceOf(PgRepository)
    })

    describe('LoadRoleByNameRepository', () => {
      it('Should return a role on loadByName success', async () => {
        await pgRoleRepo.save({ name: 'user', weight: 1 })

        const role = await sut.loadByName({ name: 'user' })

        expect(role).toEqual({ id: '1', name: 'user', weight: 1, created_at: expect.any(Date) })
      })

      it('Should return undefined if loadByName fails', async() => {
        const role = await sut.loadByName({ name: 'user' })

        expect(role).toBeUndefined()
      })
    })

    describe('AddRoleRepository', () => {
      it('Should return an role on add success', async () => {
        const role = await sut.add({ name: 'any_name', weight: 1 })

        expect(role).toEqual({ id: '1', name: 'any_name', weight: 1, created_at: expect.any(Date) })
      })
    })

    describe('LoadRolesRepository', () => {
      it('Should return an array of roles on load success', async () => {
        await pgRoleRepo.save({ name: 'user', weight: 1 })
        await pgRoleRepo.save({ name: 'admin', weight: 2 })

        const roles = await sut.load(null)

        expect(roles).toEqual([
          { id: 1, name: 'user', weight: 1, created_at: expect.any(Date) },
          { id: 2, name: 'admin', weight: 2, created_at: expect.any(Date) }
        ])
      })
    })
})
