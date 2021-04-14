/**
 * @description Creates a generic error handler class that extends baseError class
 */
import { HttpStatusCode, ErrorNames } from './http-status-codes';
import BaseError from './base-error';
declare class ApiError extends BaseError {
    constructor(name: ErrorNames, statusCode: HttpStatusCode, message: string, origin?: null);
}
export default ApiError;
