/**
 * Module dependencies
 * @description Integration test for user module.
 */

import * as app from "../src/app"
import { Database, User } from '../src/database/models'

const request = require('supertest')

let accessToken: any = null
/**
 * @description Test for user registration
 */
describe('Register new user', () => {
  test('It should signup a user successfully', async () => {
    const {body} = await request(app.default)
      .post('/api/v1/user')
      .send({
        name: 'Kachi',
        email: 'kachi@gmail.com',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toEqual(expect.objectContaining({
      active: true,
      name: 'Kachi'
    }));
  })

  test('User account already existing', async () => {
    const {body} = await request(app.default)
      .post('/api/v1/user')
      .send({
        name: 'Kachi',
        email: 'kachi@gmail.com',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(0)
    expect(body.responseText).toBe('User account already exists')
  })
})

/**
 * @description Test for user login
 */
describe('Login user', () => {
  test('It should authenticate a user successfully', async () => {
    const {body} = await request(app.default)
      .post('/api/v1/user/login')
      .send({
        email: 'kachi@gmail.com',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toEqual(expect.objectContaining({
      active: 1,
      email: 'kachi@gmail.com',
      access_token: expect.anything(),
      created_at: expect.anything(),
    }));

    accessToken = "Bearer " + body.payload.access_token
  })
})

/**
 * @description Test for user logout
 */
describe('Logout user', () => {
  test('It should logout a user successfully', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/user/logout')
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toEqual({message: 'Logged out successfully'})
  })
})

afterAll((done) => {
  User.destroy({
    where: {},
    force: true
  })
    .then(() => {
      Database.close()
      done()
    })
})
