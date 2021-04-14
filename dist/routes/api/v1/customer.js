"use strict";
/**
 * @description Module dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_validator_1 = require("../../../middlewares/validators/customer-validator");
const customer_1 = require("../../../controllers/customer");
const jwt_1 = require("../../../utils/jwt");
const { checkSchema } = require('express-validator');
const customerController = new customer_1.CustomerController();
const router = express_1.default.Router();
router.post('/', jwt_1.authenticate, checkSchema(customer_validator_1.createCustomerSchema), customerController.create);
router.get('/', jwt_1.authenticate, customerController.getAll);
router.get('/:username', jwt_1.authenticate, customerController.get);
exports.default = router;
