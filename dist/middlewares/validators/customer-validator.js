"use strict";
/**
 * @description Customer request validator schema
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerSchema = void 0;
const createCustomerSchema = {
    first_name: {
        in: ['body'],
        isString: true,
        matches: /[a-zA-Z\-\s]/,
        errorMessage: 'Not a valid first name'
    },
    last_name: {
        in: ['body'],
        isString: true,
        matches: /[a-zA-Z\-\s]/,
        errorMessage: 'Not a valid last name'
    },
    username: {
        in: ['body'],
        isString: true,
        matches: /[a-zA-Z\-\s]/,
        errorMessage: 'Not a valid username'
    },
    deposit: {
        in: ['body'],
        isNumeric: true,
        matches: /^\d+$/,
        errorMessage: 'Not a valid deposit amount'
    },
};
exports.createCustomerSchema = createCustomerSchema;
