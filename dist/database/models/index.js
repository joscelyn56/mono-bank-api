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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.Account = exports.Customer = exports.User = exports.Database = void 0;
const sequelize_1 = require("sequelize");
const dotenv = __importStar(require("dotenv"));
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const customer_1 = __importDefault(require("./customer"));
exports.Customer = customer_1.default;
const account_1 = __importDefault(require("./account"));
exports.Account = account_1.default;
const transactions_1 = __importDefault(require("./transactions"));
exports.Transaction = transactions_1.default;
dotenv.config();
const operatorsAliases = {
    $eq: sequelize_1.Op.eq,
    $ne: sequelize_1.Op.ne,
    $gte: sequelize_1.Op.gte,
    $gt: sequelize_1.Op.gt,
    $lte: sequelize_1.Op.lte,
    $lt: sequelize_1.Op.lt,
    $not: sequelize_1.Op.not,
    $in: sequelize_1.Op.in,
    $notIn: sequelize_1.Op.notIn,
    $is: sequelize_1.Op.is,
    $like: sequelize_1.Op.like,
    $notLike: sequelize_1.Op.notLike,
    $iLike: sequelize_1.Op.iLike,
    $notILike: sequelize_1.Op.notILike,
    $regexp: sequelize_1.Op.regexp,
    $notRegexp: sequelize_1.Op.notRegexp,
    $iRegexp: sequelize_1.Op.iRegexp,
    $notIRegexp: sequelize_1.Op.notIRegexp,
    $between: sequelize_1.Op.between,
    $notBetween: sequelize_1.Op.notBetween,
    $overlap: sequelize_1.Op.overlap,
    $contains: sequelize_1.Op.contains,
    $contained: sequelize_1.Op.contained,
    $adjacent: sequelize_1.Op.adjacent,
    $strictLeft: sequelize_1.Op.strictLeft,
    $strictRight: sequelize_1.Op.strictRight,
    $noExtendRight: sequelize_1.Op.noExtendRight,
    $noExtendLeft: sequelize_1.Op.noExtendLeft,
    $and: sequelize_1.Op.and,
    $or: sequelize_1.Op.or,
    $any: sequelize_1.Op.any,
    $all: sequelize_1.Op.all,
    $values: sequelize_1.Op.values,
    $col: sequelize_1.Op.col
};
// Open database connection
const sequelize = new sequelize_1.Sequelize(
// @ts-ignore
process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: operatorsAliases,
    options: {
        pool: {
            max: 5,
            min: 0,
            idle: 5000,
            evict: 5000,
        },
        logging: process.env.NODE_ENV === 'development' ? false : console.log,
        timezeone: 'Africa/Lagos',
    }
});
exports.Database = sequelize;
// Initialize each model in the database
// This must be done before associations are made
let models = [user_1.default, customer_1.default, account_1.default, transactions_1.default];
models.forEach(model => model.initialize(sequelize));
// Create database tables
// force: true causes database to reset with each run
sequelize.sync({ force: false });
