import { InvalidParamError, RequiredFieldError } from '@/application/errors'
import { User } from '@/infra/pg/entities'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/../tests/infra/pg/mocks'

import { IBackup } from 'pg-mem'
import request from 'supertest'
import { getConnection } from 'typeorm'

describe('Signin Route', () => {
  describe('POST /signin', () => {
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([User])
      backup = db.backup()
    })
    beforeEach(() => {
      backup.restore()
    })
    afterAll(async () => {
      await getConnection().close()
    })

    // it('should return 200 with accessToken', async () => {
    //   await request(app)
    //     .post('/api/signup')
    //     .send({ email: 'teste@teste.com', name: 'user', password: '123456', passwordConfirmation: '123456' })
    //   await request(app)
    //     .post('/api/signin')
    //     .send({ email: 'teste@teste.com', password: '123456' })
    //     .expect(200)
    // })

    it('should return 403 with ForbiddenError', async () => {
      await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 'user', password: '123456', passwordConfirmation: '123456' })
      await request(app)
        .post('/api/signin')
        .send({ email: 'teste@teste.com', password: '1234567' })
        .expect(403)
    })

    it('should return 400 with RequiredFieldError', async () => {
      await request(app)
        .post('/api/signin')
        .send({ email: 'teste@teste.com' })
        .expect(400, { error: new RequiredFieldError('password').message })

      const { status, body } = await request(app)
        .post('/api/signin')
        .send({ password: 'teste' })

      expect(status).toBe(400)
      expect(body.error).toBe(new RequiredFieldError('email').message)
    })

    it('should return 400 with InvalidPararError', async () => {
      await request(app)
        .post('/api/signin')
        .send({ email: 'teste', password: 'user' })
        .expect(400, { error: new InvalidParamError('email').message })
    })
  })
})
