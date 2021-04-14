"use strict";
/**
 * @description User request validator schema
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransferSchema = void 0;
const createTransferSchema = {
    customer_id: {
        in: ['body'],
        isNumeric: true,
        matches: /^\d+$/,
        errorMessage: 'Not a valid customer id'
    },
    receiver_account_number: {
        in: ['body'],
        isNumeric: true,
        matches: /^\d{10}$/,
        errorMessage: 'Not a valid account number'
    },
    amount: {
        in: ['body'],
        isNumeric: true,
        matches: /^\d+$/,
        errorMessage: 'Not a valid amount'
    },
};
exports.createTransferSchema = createTransferSchema;
