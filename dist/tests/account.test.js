"use strict";
/**
 * Module dependencies
 * @description Integration test for user module.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app = __importStar(require("../app"));
const models_1 = require("../database/models");
const request = require('supertest');
let accessToken = null;
let customer1Id = null;
let customer2Id = null;
let customer1AccountId = null;
let customer2AccountId = null;
let customer3AccountId = null;
let customer1AccountNumber = null;
let customer2AccountNumber = null;
let customer3AccountNumber = null;
/**
 * @description Test for user registration
 */
describe('Register new user', () => {
    test('It should signup a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .post('/api/v1/user')
            .send({
            name: 'James',
            email: 'james@gmail.com',
            password: 'password'
        })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toEqual(expect.objectContaining({
            active: true,
            name: 'James'
        }));
    }));
});
/**
 * @description Test for user login
 */
describe('Login user', () => {
    test('It should authenticate a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .post('/api/v1/user/login')
            .send({
            email: 'james@gmail.com',
            password: 'password'
        })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toEqual(expect.objectContaining({
            active: 1,
            email: 'james@gmail.com',
            access_token: expect.anything(),
            created_at: expect.anything(),
        }));
        accessToken = "Bearer " + body.payload.access_token;
    }));
});
/**
 * @description Test for customer registration
 */
describe('Register new customer', () => {
    test('It should signup a customer successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
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
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveProperty("first_name");
        expect(body.payload).toHaveProperty("last_name");
        expect(body.payload).toHaveProperty("username");
        expect(body.payload).toHaveProperty("active");
        customer1Id = body.payload.id;
        customer1AccountId = body.payload.account.id;
        customer1AccountNumber = body.payload.account.account_number;
    }));
    test('It should signup a customer successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
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
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveProperty("first_name");
        expect(body.payload).toHaveProperty("last_name");
        expect(body.payload).toHaveProperty("username");
        expect(body.payload).toHaveProperty("active");
        customer2Id = body.payload.id;
        customer2AccountId = body.payload.account.id;
        customer2AccountNumber = body.payload.account.account_number;
    }));
});
/**
 * @description Test for create another account for customer
 */
describe('Create new account', () => {
    test('It should create another account for customer successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .post('/api/v1/account')
            .send({
            customer_id: customer1Id,
            deposit: 11000
        })
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload.account).toHaveProperty("account_number");
        expect(body.payload.account).toHaveProperty("balance");
        customer3AccountId = body.payload.account.id;
        customer3AccountNumber = body.payload.account.account_number;
    }));
});
/**
 * @description Test for account information
 */
describe('Get account information', () => {
    test('It should return all accounts successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/account')
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveLength(3);
    }));
    test('It should return customer 1 account successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/account?account_number=' + customer1AccountNumber)
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveLength(1);
    }));
    test('It should return customer 2 account successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/account/' + customer2AccountId)
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveProperty("account_number");
        expect(body.payload).toHaveProperty("balance");
    }));
});
/**
 * @description Test for account transfer
 */
describe('Transfer money across accounts', () => {
    test('It should return transfer successful', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
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
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toEqual({ message: 'Transfer Successful' });
    }));
    test('It should return customer 1 account successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/account/' + customer1AccountId)
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveProperty("account_number");
        expect(body.payload).toHaveProperty("balance");
        expect(body.payload.balance).toEqual(1000);
    }));
    test('It should return customer 2 account successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/account/' + customer2AccountId)
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveProperty("account_number");
        expect(body.payload).toHaveProperty("balance");
        expect(body.payload.balance).toEqual(6000);
    }));
});
/**
 * @description Test for account transfer
 */
describe('Transfer money between accounts owned by one customer', () => {
    test('It should return transfer successful', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
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
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toEqual({ message: 'Transfer Successful' });
    }));
    test('It should return customer 1 first account successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/account/' + customer1AccountId)
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveProperty("account_number");
        expect(body.payload).toHaveProperty("balance");
        expect(body.payload.balance).toEqual(8000);
    }));
    test('It should return customer 1 second account successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/account/' + customer3AccountId)
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveProperty("account_number");
        expect(body.payload).toHaveProperty("balance");
        expect(body.payload.balance).toEqual(4000);
    }));
});
/**
 * @description Test for account deposit
 */
describe('Deposit money into account owned one customer', () => {
    test('It should return transfer successful', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .post('/api/v1/account/deposit')
            .send({
            account_id: customer2AccountId,
            deposit: 17000
        })
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toEqual({ message: 'Deposit Successful' });
    }));
    test('It should return customer 2 account successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/account/' + customer2AccountId)
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveProperty("account_number");
        expect(body.payload).toHaveProperty("balance");
        expect(body.payload.balance).toEqual(23000);
    }));
});
/**
 * @description Test for account transfer
 */
describe('Get account history', () => {
    test('It should return customer 1 first account history', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/account/history/' + customer1AccountId)
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveLength(3);
    }));
    test('It should return customer 2 account history', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/account/history/' + customer2AccountId)
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveLength(3);
    }));
    test('It should return customer 1 second account history', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/account/history/' + customer3AccountId)
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toHaveLength(2);
    }));
});
/**
 * @description Test for user logout
 */
describe('Logout user', () => {
    test('It should logout a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .get('/api/v1/user/logout')
            .set({
            'Accept': 'application/json',
            'authorization': accessToken,
        })
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toEqual({ message: 'Logged out successfully' });
    }));
});
afterAll((done) => {
    models_1.Transaction.destroy({
        where: {},
        force: true
    })
        .then(() => {
        return models_1.Account.destroy({
            where: {},
            force: true
        });
    })
        .then(() => {
        return models_1.Customer.destroy({
            where: {},
            force: true
        });
    })
        .then(() => {
        return models_1.User.destroy({
            where: {},
            force: true
        });
    })
        .then(() => {
        models_1.Database.close();
        done();
    });
});
