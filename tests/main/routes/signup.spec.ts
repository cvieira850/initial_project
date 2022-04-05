import { InvalidParamError, RequiredFieldError, UnauthorizedError } from '@/application/errors'
import { User } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { IBackup } from 'pg-mem'
import request from 'supertest'
import { getConnection } from 'typeorm'

describe('Signup Route', () => {
  describe('POST /signup', () => {
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
    it('should return 200 with accessToken', async () => {
      await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 'user', password: '123456', passwordConfirmation: '123456' })
        .expect(200)
    })

    it('should return 401 with unauthorizedError', async () => {
      await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 'user', password: '123456', passwordConfirmation: '123456' })
        .expect(200)

      await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 'user', password: '123456', passwordConfirmation: '123456' })
        .expect(401, { error: new UnauthorizedError().message })
    })

    it('should return 400 with RequiredFieldError', async () => {
      await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com' })
        .expect(400, { error: new RequiredFieldError('name').message })

      const { status, body } = await request(app)
        .post('/api/signup')
        .send({ name: 'teste' })

      expect(status).toBe(400)
      expect(body.error).toBe(new RequiredFieldError('email').message)

      await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 'teste' })
        .expect(400, { error: new RequiredFieldError('password').message })

      await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 'teste', password: '123456' })
        .expect(400, { error: new RequiredFieldError('passwordConfirmation').message })
    })

    it('should return 400 with InvalidPararError', async () => {
      await request(app)
        .post('/api/signup')
        .send({ email: 'teste', name: 'teste' })
        .expect(400, { error: new InvalidParamError('email').message })

      await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 'teste', password: '123456', passwordConfirmation: '12345678' })
        .expect(400, { error: new InvalidParamError('passwordConfirmation').message })

      await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 2, password: '123456', passwordConfirmation: '12345678' })
        .expect(400, { error: new InvalidParamError('name').message })

      await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 'teste', password: 123456, passwordConfirmation: '12345678' })
        .expect(400, { error: new InvalidParamError('password').message })

      await request(app)
        .post('/api/signup')
        .send({ email: 'teste@teste.com', name: 'teste', password: '123456', passwordConfirmation: 12345678 })
        .expect(400, { error: new InvalidParamError('passwordConfirmation').message })
    })
  })
})
