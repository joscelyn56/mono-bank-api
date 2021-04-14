"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
/**
 * Module Dependencies
 */
const transform_response_1 = require("../utils/transform-response");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("../utils/jwt"));
const models_1 = require("../database/models");
class UserController {
    /**
     * @description Registers a user account
     */
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = Object.assign(Object.assign({}, req.body), { password: yield bcrypt.hash(req.body.password, 10) });
                const query = {
                    where: { email: user.email }
                };
                const existingUser = yield models_1.User.findOne(query);
                if (existingUser)
                    throw new Error('User account already exists');
                const newUser = yield models_1.User.create(user);
                if (!newUser)
                    throw new Error('Could not create user account');
                const _a = newUser.get({ plain: true }), { password } = _a, rest = __rest(_a, ["password"]);
                res.status(200).json(transform_response_1.transformResponse(1, 'ok', rest));
            }
            catch (error) {
                res.status(400).json(transform_response_1.transformResponse(0, error.message, error));
            }
        });
    }
    /**
     * @function Logs In user and generates an access token
     * @param req
     * @param res
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = Object.assign({}, req.body);
                let userDetails = null;
                const query = {
                    where: { email: user.email },
                    raw: true
                };
                const userData = yield models_1.User.findOne(query);
                if (!userData)
                    throw new Error('User Not Found');
                const { password: hashedPassword } = userData, rest = __rest(userData, ["password"]);
                userDetails = rest;
                const validated = bcrypt.compare(user.password, hashedPassword);
                if (!validated) {
                    res.status(400).json(transform_response_1.transformResponse(0, "Password is incorrect", {}));
                }
                userDetails.access_token = jwt.sign(userDetails, 144000);
                req.session.is_auth = true;
                res.json(transform_response_1.transformResponse(1, 'ok', userDetails));
            }
            catch (error) {
                res.status(400).json(transform_response_1.transformResponse(0, error.message, {}));
            }
        });
    }
    /**
     * @function Just a simple function to invalidate user session token
     * @param req
     * @param res
     */
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.is_auth = false;
            req.session.user = null;
            res.json(transform_response_1.transformResponse(1, 'ok', { message: 'Logged out successfully' }));
        });
    }
}
exports.UserController = UserController;
