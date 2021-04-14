/**
 * @description Creates a base error handler class
 */
import { HttpStatusCode } from './http-status-codes';
declare class BaseError extends Error {
    readonly name: string;
    readonly statusCode: HttpStatusCode;
    readonly origin: any;
    constructor(name: string, statusCode: HttpStatusCode, message: string, origin?: null);
}
export default BaseError;
