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
/**
 * @description Test for user registration
 */
describe('Register new user', () => {
    test('It should signup a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .post('/api/v1/user')
            .send({
            name: 'Kachi',
            email: 'kachi@gmail.com',
            password: 'password'
        })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toEqual(expect.objectContaining({
            active: true,
            name: 'Kachi'
        }));
    }));
    test('User account already existing', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield request(app.default)
            .post('/api/v1/user')
            .send({
            name: 'Kachi',
            email: 'kachi@gmail.com',
            password: 'password'
        })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(0);
        expect(body.responseText).toBe('User account already exists');
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
            email: 'kachi@gmail.com',
            password: 'password'
        })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
        expect(body.responseCode).toBe(1);
        expect(body.responseText).toBe('ok');
        expect(body.payload).toEqual(expect.objectContaining({
            active: 1,
            email: 'kachi@gmail.com',
            access_token: expect.anything(),
            created_at: expect.anything(),
        }));
        accessToken = "Bearer " + body.payload.access_token;
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
    models_1.User.destroy({
        where: {},
        force: true
    })
        .then(() => {
        models_1.Database.close();
        done();
    });
});
