import { User } from '@/infra/postgres/entities'
import { PgConnection } from '@/infra/postgres/helpers'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { IBackup } from 'pg-mem'
import request from 'supertest'

describe('Users Route', () => {
  let backup: IBackup
  let connection: PgConnection

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([User])
    backup = db.backup()
  })
  beforeEach(() => {
    backup.restore()
  })
  afterAll(async () => {
    await connection.disconnect()
  })

  describe('GET /users/:userId', () => {
    it('should return 200 with user', async () => {
      const { body } = await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 'user', password: '123456', passwordConfirmation: '123456' })

      const response = await request(app)
        .get('/api/me')
        .set('x-access-token', body.accessToken)

      const id: string = response.body.id
      const { status, body: bodyResult } = await request(app)
        .get(`/api/users/${id}`)
        .set('x-access-token', body.accessToken)

      expect(status).toBe(200)
      expect(bodyResult.email).toBe(response.body.email)
      expect(bodyResult.role).toBe(response.body.role)
      expect(bodyResult.access_token).toBe(response.body.access_token)
      expect(bodyResult.id).toBe(response.body.id)
      expect(bodyResult.name).toBe(response.body.name)
    })
  })
})
