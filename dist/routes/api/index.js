"use strict";
/**
 * @description Module dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./v1/index"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200).json({ title: "Welcome to API route" });
});
router.use('/v1', index_1.default);
exports.default = router;
