import { IBackup } from "pg-mem"
import { Repository } from "typeorm"
import { PgEventRepository } from "@/infra/postgres/repos"
import { Event, User } from "@/infra/postgres/entities"
import { PgConnection } from "@/infra/postgres/helpers"
import { makeFakeDb } from "../mocks"
import { PgRepository } from "@/infra/postgres/repos/repository"

describe('PgEventRepository', () => {
    let sut: PgEventRepository
    let connection: PgConnection
    let pgUserRepo: Repository<User>
    let pgEventRepo: Repository<Event>
    let backup: IBackup

    beforeAll(async () => {
      connection = PgConnection.getInstance()
      const db = await makeFakeDb()
      backup = db.backup()
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
    it('Should return an event on loadByName', async () => {
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', password: '1234', role: 'user' })
      await pgEventRepo.save({ name: 'any_name', user_id: '1', description: 'any_description' })

      const event = await sut.loadByName({ userId: '1', name: 'any_name' })

      expect(event).toEqual({ id: '1', name: 'any_name', user_id: '1', description: 'any_description', created_at: expect.any(Date) })
    })
  })
})
