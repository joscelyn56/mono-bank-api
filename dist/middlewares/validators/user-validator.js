"use strict";
/**
 * @description User request validator schema
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.createUserSchema = void 0;
const createUserSchema = {
    name: {
        in: ['body'],
        isString: true,
        matches: /[a-zA-Z\-\s]/,
        errorMessage: 'Not a valid name'
    },
    email: {
        in: ['body'],
        isEmail: true,
        errorMessage: 'Not a valid email'
    },
    password: {
        in: ['body'],
        isString: true,
        matches: /[a-zA-Z\-\s]/,
        errorMessage: 'Not a valid password'
    },
};
exports.createUserSchema = createUserSchema;
const loginSchema = {
    password: {
        in: ['body'],
        isString: true,
        matches: /[a-zA-Z\-\s]/,
        errorMessage: 'Not a valid password'
    },
    email: {
        in: ['body'],
        isEmail: true,
        errorMessage: 'Not a valid email'
    },
};
exports.loginSchema = loginSchema;
