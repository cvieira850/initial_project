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
})
