"use strict";
/**
 * @description User request validator schema
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransferSchema = exports.createDepositSchema = exports.createCreateAccountSchema = void 0;
const createCreateAccountSchema = {
    customer_id: {
        in: ['body'],
        isNumeric: true,
        matches: /^\d+$/,
        errorMessage: 'Not a valid customer id'
    },
    deposit: {
        in: ['body'],
        isNumeric: true,
        matches: /^\d+$/,
        errorMessage: 'Not a valid amount'
    },
};
exports.createCreateAccountSchema = createCreateAccountSchema;
const createDepositSchema = {
    account_id: {
        in: ['body'],
        isNumeric: true,
        matches: /^\d+$/,
        errorMessage: 'Not a valid account id'
    },
    deposit: {
        in: ['body'],
        isNumeric: true,
        matches: /^\d+$/,
        errorMessage: 'Not a valid amount'
    },
};
exports.createDepositSchema = createDepositSchema;
const createTransferSchema = {
    sender_account_id: {
        in: ['body'],
        isNumeric: true,
        matches: /^\d+$/,
        errorMessage: 'Not a valid account id'
    },
    receiver_account_id: {
        in: ['body'],
        isNumeric: true,
        //matches: /^\d{10}$/,
        matches: /^\d+$/,
        errorMessage: 'Not a valid account id'
    },
    amount: {
        in: ['body'],
        isNumeric: true,
        matches: /^\d+$/,
        errorMessage: 'Not a valid amount'
    },
};
exports.createTransferSchema = createTransferSchema;
