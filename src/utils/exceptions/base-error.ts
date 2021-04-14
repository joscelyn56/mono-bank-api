/**
 * @description Creates a base error handler class
 */

import { HttpStatusCode } from './http-status-codes'

 class BaseError extends Error {
    public readonly name: string
    public readonly statusCode: HttpStatusCode
    public readonly origin:any

    constructor(name: string, statusCode: HttpStatusCode, message: string, origin = null) {
        super(message);

        this.name = name || 'BaseError';
        this.statusCode = statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
        this.origin = origin;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default BaseError;