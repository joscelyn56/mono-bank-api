"use strict";
/**
 * @description Module dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_validator_1 = require("../../../middlewares/validators/user-validator");
const user_1 = require("../../../controllers/user");
const jwt_1 = require("../../../utils/jwt");
const { checkSchema } = require('express-validator');
const userController = new user_1.UserController();
const router = express_1.default.Router();
router.post('/', checkSchema(user_validator_1.createUserSchema), userController.register);
router.post('/login', checkSchema(user_validator_1.loginSchema), userController.login);
router.get('/logout', jwt_1.authenticate, userController.logout);
exports.default = router;
