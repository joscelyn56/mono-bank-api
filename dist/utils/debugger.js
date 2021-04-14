"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
/**
 * Set up debugger namespace
 */
const debugLog = debug_1.default('Stackoverflow-clone:server');
exports.default = debugLog;
