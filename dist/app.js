"use strict";
/**
 * @description Module dependencies
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyparser = __importStar(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importDefault(require("http-errors"));
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
const session_secret = process.env.SESSION_SECRET;
/**
 * @description Mount middlewares on app
 */
app.use(morgan_1.default('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false, limit: '10mb' }));
app.use(compression_1.default());
app.use(cors_1.default());
app.use(express_session_1.default({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
}));
app.use('/', routes_1.default);
/**
 * @description catch 404 and forward to error handler
 */
app.use((req, res, next) => {
    next(http_errors_1.default(404));
});
/**
 * @description Error handler
 */
app.use(error_handler_1.default);
exports.default = app;
