"use strict";
/**
 * @description Creates a base error handler class
 */
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("./http-status-codes");
class BaseError extends Error {
    constructor(name, statusCode, message, origin = null) {
        super(message);
        this.name = name || 'BaseError';
        this.statusCode = statusCode || http_status_codes_1.HttpStatusCode.INTERNAL_SERVER_ERROR;
        this.origin = origin;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = BaseError;
