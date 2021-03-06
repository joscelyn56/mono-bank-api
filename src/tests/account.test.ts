/**
 * Module dependencies
 * @description Integration test for user module.
 */

import * as app from "../app"
import { Customer, Database, User, Transaction, Account } from '../database/models'

const request = require('supertest')

let accessToken: any = null
let customer1Id: any = null
let customer2Id: any = null
let customer1AccountId: any = null
let customer2AccountId: any = null
let customer3AccountId: any = null
let customer1AccountNumber: any = null
let customer2AccountNumber: any = null
let customer3AccountNumber: any = null

/**
 * @description Test for user registration
 */
describe('Register new user', () => {
  test('It should signup a user successfully', async () => {
    const {body} = await request(app.default)
      .post('/api/v1/user')
      .send({
        name: 'James',
        email: 'james@gmail.com',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toEqual(expect.objectContaining({
      active: true,
      name: 'James'
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
        email: 'james@gmail.com',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toEqual(expect.objectContaining({
      active: 1,
      email: 'james@gmail.com',
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
        first_name: 'Oge',
        last_name: 'Don',
        username: 'oge569',
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

    customer1Id = body.payload.id
    customer1AccountId = body.payload.account.id
    customer1AccountNumber = body.payload.account.account_number
  })
  test('It should signup a customer successfully', async () => {
    const {body} = await request(app.default)
      .post('/api/v1/customer')
      .send({
        first_name: 'Emeka',
        last_name: 'John',
        username: 'johnn56',
        deposit: 2000
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

    customer2Id = body.payload.id
    customer2AccountId = body.payload.account.id
    customer2AccountNumber = body.payload.account.account_number
  })
})

/**
 * @description Test for create another account for customer
 */
describe('Create new account', () => {
  test('It should create another account for customer successfully', async () => {
    const {body} = await request(app.default)
      .post('/api/v1/account')
      .send({
        customer_id: customer1Id,
        deposit: 11000
      })
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload.account).toHaveProperty("account_number")
    expect(body.payload.account).toHaveProperty("balance")

    customer3AccountId = body.payload.account.id
    customer3AccountNumber = body.payload.account.account_number
  })
})

/**
 * @description Test for account information
 */
describe('Get account information', () => {
  test('It should return all accounts successfully', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/account')
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveLength(3)
  })
  test('It should return customer 1 account successfully', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/account?account_number=' + customer1AccountNumber)
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveLength(1)
  })
  test('It should return customer 2 account successfully', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/account/' + customer2AccountId)
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveProperty("account_number")
    expect(body.payload).toHaveProperty("balance")
  })
})

/**
 * @description Test for account transfer
 */
describe('Transfer money across accounts', () => {
  test('It should return transfer successful', async () => {
    const {body} = await request(app.default)
      .post('/api/v1/account/transfer')
      .send({
        sender_account_id: customer1AccountId,
        receiver_account_id: customer2AccountId,
        amount: 4000
      })
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toEqual({message: 'Transfer Successful'})
  })
  test('It should return customer 1 account successfully', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/account/' + customer1AccountId)
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveProperty("account_number")
    expect(body.payload).toHaveProperty("balance")
    expect(body.payload.balance).toEqual(1000)
  })
  test('It should return customer 2 account successfully', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/account/' + customer2AccountId)
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveProperty("account_number")
    expect(body.payload).toHaveProperty("balance")
    expect(body.payload.balance).toEqual(6000)
  })
})

/**
 * @description Test for account transfer
 */
describe('Transfer money between accounts owned by one customer', () => {
  test('It should return transfer successful', async () => {
    const {body} = await request(app.default)
      .post('/api/v1/account/transfer')
      .send({
        sender_account_id: customer3AccountId,
        receiver_account_id: customer1AccountId,
        amount: 7000
      })
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toEqual({message: 'Transfer Successful'})
  })
  test('It should return customer 1 first account successfully', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/account/' + customer1AccountId)
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveProperty("account_number")
    expect(body.payload).toHaveProperty("balance")
    expect(body.payload.balance).toEqual(8000)
  })
  test('It should return customer 1 second account successfully', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/account/' + customer3AccountId)
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveProperty("account_number")
    expect(body.payload).toHaveProperty("balance")
    expect(body.payload.balance).toEqual(4000)
  })
})

/**
 * @description Test for account deposit
 */
describe('Deposit money into account owned one customer', () => {
  test('It should return transfer successful', async () => {
    const {body} = await request(app.default)
      .post('/api/v1/account/deposit')
      .send({
        account_id: customer2AccountId,
        deposit: 17000
      })
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toEqual({message: 'Deposit Successful'})
  })
  test('It should return customer 2 account successfully', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/account/' + customer2AccountId)
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveProperty("account_number")
    expect(body.payload).toHaveProperty("balance")
    expect(body.payload.balance).toEqual(23000)
  })
})

/**
 * @description Test for account transfer
 */
describe('Get account history', () => {
  test('It should return customer 1 first account history', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/account/history/' + customer1AccountId)
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveLength(3)
  })
  test('It should return customer 2 account history', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/account/history/' + customer2AccountId)
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveLength(3)
  })
  test('It should return customer 1 second account history', async () => {
    const {body} = await request(app.default)
      .get('/api/v1/account/history/' + customer3AccountId)
      .set({
        'Accept': 'application/json',
        'authorization': accessToken,
      })
      .expect('Content-Type', /json/)

    expect(body.responseCode).toBe(1)
    expect(body.responseText).toBe('ok')
    expect(body.payload).toHaveLength(2)
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
