"use strict";
/**
 * @description Module dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const account_1 = __importDefault(require("./account"));
const customer_1 = __importDefault(require("./customer"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200).json({ title: "Welcome to Mono Bank API Version 1" });
});
router.use('/user', user_1.default);
router.use('/account', account_1.default);
router.use('/customer', customer_1.default);
exports.default = router;
