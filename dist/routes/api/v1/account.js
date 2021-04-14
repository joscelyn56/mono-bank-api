"use strict";
/**
 * @description Module dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_validator_1 = require("../../../middlewares/validators/account-validator");
const account_1 = require("../../../controllers/account");
const jwt_1 = require("../../../utils/jwt");
const { checkSchema } = require('express-validator');
const accountController = new account_1.AccountController();
const router = express_1.default.Router();
router.get('/', jwt_1.authenticate, accountController.getAll);
router.get('/:id', jwt_1.authenticate, accountController.get);
router.get('/history/:id', jwt_1.authenticate, accountController.getHistory);
router.post('/transfer', jwt_1.authenticate, checkSchema(account_validator_1.createTransferSchema), accountController.transfer);
exports.default = router;
