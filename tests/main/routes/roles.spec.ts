import { Role } from '@/infra/postgres/entities'
import { PgConnection } from '@/infra/postgres/helpers'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { IBackup } from 'pg-mem'
import request from 'supertest'

describe('Role routes', () => {
  let backup: IBackup
  let connection: PgConnection

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([Role])
    backup = db.backup()
  })
  beforeEach(() => {
    backup.restore()
  })
  afterAll(async () => {
    await connection.disconnect()
  })

  describe('POST /roles', () => {
    it('should return 200 with role', async () => {
      const { status, body } = await request(app)
        .post('/api/roles')
        .send({ name: 'user', weight: 1 })

      expect(status).toBe(200)
      expect(body.name).toBe('user')
      expect(body.weight).toBe(1)
    })
  })
})
