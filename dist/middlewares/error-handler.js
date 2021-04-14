"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("./../utils/exceptions/api-error"));
const base_error_1 = __importDefault(require("./../utils/exceptions/base-error"));
/**
 * @description Error handler middleware
 * @param {error} ApiError
 */
const handleErrors = (error, req, res, next) => {
    if (error instanceof api_error_1.default || error instanceof base_error_1.default) {
        next(error);
        return res.status(error.statusCode).json({
            error: error.name,
            message: error.message
        });
    }
    next(error);
    return res.status(500).json({
        error: 'Unknown error',
        message: `There's been a glitch in the system`
    });
};
exports.default = handleErrors;
