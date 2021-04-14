"use strict";
/**
 * @description Creates a generic error handler class that extends baseError class
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = __importDefault(require("./base-error"));
class ApiError extends base_error_1.default {
    constructor(name, statusCode, message, origin = null) {
        super(name, statusCode, message, origin);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ApiError;
