/**
 * Module dependencies
 * @description Integration test for user module.
 */

import * as app from "../app"
import { Customer, Database, User, Transaction, Account } from '../database/models'

const request = require('supertest')

let accessToken: any = null
let customerUserName: any = null

/**
 * @description Test for user registration
 */
describe('Register new user', () => {
  test('It should signup a user successfully', async () => {
    const {body} = await request(app.default)
      .post('/api/v1/user')
      .send({
        name: 'Okon',
        email: 'okon@gmail.com',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toEqual(expect.objectContaining({
      active: true,
      name: 'Okon'
    }));
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
        email: 'okon@gmail.com',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toEqual(expect.objectContaining({
      active: 1,
      email: 'okon@gmail.com',
      access_token: expect.anything(),
      created_at: expect.anything(),
    }));

    accessToken = "Bearer " + body.payload.access_token
  })
})

/**
 * @description Test for customer registration
 */
describe('Register new customer', () => {
  test('It should signup a customer successfully', async () => {
    const {body} = await request(app.default)
      .post('/api/v1/customer')
      .send({
        first_name: 'Kinikachi',
        last_name: 'Okwu',
        username: 'kachi566',
        deposit: 5000
      })
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveProperty("first_name")
    expect(body.payload).toHaveProperty("last_name")
    expect(body.payload).toHaveProperty("username")
    expect(body.payload).toHaveProperty("active")

    customerUserName = body.payload.username
  })
  test('It should return all customer successfully', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/customer')
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveLength(1)
  })
  test('It should return customer successfully', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/customer/' + customerUserName)
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveProperty("first_name")
    expect(body.payload).toHaveProperty("last_name")
    expect(body.payload).toHaveProperty("username")
    expect(body.payload).toHaveProperty("active")
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
  Transaction.destroy({
    where: {},
    force: true
  })
    .then(() => {
      return Account.destroy({
        where: {},
        force: true
      })
    })
    .then(() => {
      return Customer.destroy({
        where: {},
        force: true
      })
    })
    .then(() => {
      return User.destroy({
        where: {},
        force: true
      })
    })
    .then(() => {
      Database.close()
      done()
    })
})
