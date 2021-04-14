"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tokenStatus;
(function (tokenStatus) {
    tokenStatus[tokenStatus["NOT_EXISTING"] = 0] = "NOT_EXISTING";
    tokenStatus[tokenStatus["INVALID"] = 1] = "INVALID";
    tokenStatus[tokenStatus["EXPIRED"] = 2] = "EXPIRED";
    tokenStatus[tokenStatus["VALID"] = 3] = "VALID";
})(tokenStatus || (tokenStatus = {}));
/**
 * @function Signs payload object and generates a token
 * @param payload
 * @param timeout
 */
const sign = (payload, timeout) => {
    let token = jsonwebtoken_1.default.sign(payload, "mono_bank_secret_key_token", { expiresIn: timeout });
    return token;
};
exports.sign = sign;
/**
 * @function Verifies signed token
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFuntion}
 */
const verify = (req, res, next) => {
    const header = req.headers['authorization'];
    let token = header && header.split(' ')[1];
    let token_status = tokenStatus.NOT_EXISTING;
    if (typeof header === 'undefined')
        token_status = tokenStatus.NOT_EXISTING;
    jsonwebtoken_1.default.verify(token, "mono_bank_secret_key_token", (err, decoded) => {
        if (err)
            token_status = tokenStatus.INVALID;
        else {
            token_status = tokenStatus.VALID;
            req.session.user = decoded;
        }
        if (req.session.is_auth === false) {
            token_status = tokenStatus.EXPIRED;
            req.session.user = null;
        }
    });
    return token_status;
};
exports.verify = verify;
const authenticate = (req, res, next) => {
    let token = verify(req, res, next);
    if (token === tokenStatus.NOT_EXISTING)
        return res.status(401).json({ description: 'Token does not exist' });
    if (token === tokenStatus.INVALID)
        return res.status(401).json({ description: 'Token has expired' });
    if (token === tokenStatus.EXPIRED)
        return res.status(401).json({ description: 'Your session has expired' });
    if (token === tokenStatus.VALID)
        next();
};
exports.authenticate = authenticate;
