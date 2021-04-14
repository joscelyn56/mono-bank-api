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
exports.server = void 0;
const http = __importStar(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const debugger_1 = __importDefault(require("./utils/debugger"));
global.Promise = require('bluebird');
dotenv_1.default.config();
/**
 * @description Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const parsedPort = parseInt(val, 10);
    if (Number.isNaN(parsedPort)) {
        // named pipe
        return val;
    }
    if (parsedPort >= 0) {
        // port number
        return parsedPort;
    }
    return false;
}
/**
 * @description Get port from enviroment,normalize port and store in Express
 */
const port = normalizePort(process.env.PORT || '3000');
app_1.default.set('port', port);
/**
 * @description Create http server and listen on provided port
 * @param {Application} app - Express application interface
 */
exports.server = http.createServer(app_1.default);
exports.server.listen(port);
/**
 * @description Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? `Pipe${port}`
        : `Port${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
* @description Event listener for HTTP server "listening" event.
*/
function onListening() {
    const addr = exports.server.address();
    const bind = typeof addr === 'string'
        ? `${addr}`
        : `${addr.port}`;
    debugger_1.default(`Server listening on port: ${bind}`);
}
/**
 * @description Listen to error event and handling it
 */
exports.server.on('error', onError);
exports.server.on('listening', onListening);
/**
 * @description Catch unhandled rejections and uncaugth exceptions
 */
process.on('unhandledRejection', (reason, promise) => {
    throw reason;
});
process.on('uncaughtException', (error) => {
    console.error('There was an uncaught err', error);
    process.exit(1);
});
