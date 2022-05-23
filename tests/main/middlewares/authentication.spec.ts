import { app } from '@/main/config/app'
import { auth } from '@/main/middlewares'
import { ForbiddenError } from '@/application/errors'
import { makeFakeDb } from '../../infra/pg/mocks'
import { User } from '@/infra/pg/entities'

import request from 'supertest'
import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'

describe('Authentication Middleware', () => {
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

  // it('should return 200 if accessToken header is valid', async () => {
  //   app.get('/fake_route', auth, (req, res) => {
  //     res.json()
  //   })

  //   const { body: bodyResponse } = await request(app)
  //     .post('/api/signup')
  //     .send({ email: 'teste@teste.com', name: 'user', password: '123456', passwordConfirmation: '123456' })

  //   const { status } = await request(app)
  //     .get('/fake_route')
  //     .set('x-access-token', bodyResponse.accessToken)

  //   expect(status).toBe(200)
  // })

  it('should return 403 if accessToken header was not provided', async () => {
    app.get('/fake_route', auth)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(403)
    expect(body.error).toBe(new ForbiddenError().message)
  })
})
