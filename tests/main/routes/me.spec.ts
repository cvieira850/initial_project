import { User } from '@/infra/postgres/entities'
import { PgConnection } from '@/infra/postgres/helpers'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { IBackup } from 'pg-mem'
import request from 'supertest'

describe('Me Route', () => {
  describe('GET /me', () => {
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

    it('should return 200 with user', async () => {
      const { body } = await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 'user', password: '123456', passwordConfirmation: '123456' })

      const response = await request(app)
        .get('/api/me')
        .set('x-access-token', body.accessToken)

      expect(response.status).toBe(200)
      expect(response.body.email).toBe('teste@teste.com')
      expect(response.body.name).toBe('user')
      expect(response.body.role).toBe('user')
      expect(response.body.accessToken).toBe(body.accessToken)
      expect(response.body.id).toBeTruthy()
    })

    it('should return 403 if no AccessToken was given', async () => {
      const response = await request(app)
        .get('/api/me')

      expect(response.status).toBe(403)
    })
  })
})
