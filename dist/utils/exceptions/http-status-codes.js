"use strict";
/**
 * @description Defines HTTP status codes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorNames = exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["CREATED"] = 201] = "CREATED";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED_ERROR"] = 401] = "UNAUTHORIZED_ERROR";
    HttpStatusCode[HttpStatusCode["FORBIDDEN_ERROR"] = 403] = "FORBIDDEN_ERROR";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));
/**
 * @description Define error names
 */
var ErrorNames;
(function (ErrorNames) {
    ErrorNames["NOT_FOUND"] = "NOT_FOUND";
    ErrorNames["BAD_REQUEST"] = "BAD_REQUEST";
    ErrorNames["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
})(ErrorNames = exports.ErrorNames || (exports.ErrorNames = {}));
