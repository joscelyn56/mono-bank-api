/**
 * @description Module dependencies
 */

import * as http from 'http';
import app from './app';
import dotenv from 'dotenv';
import debugLog from './utils/debugger'
global.Promise = require('bluebird');

dotenv.config();

/**
 * @description Normalize a port into a number, string, or false.
 */
function normalizePort(val : string) {
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

const port  = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * @description Create http server and listen on provided port
 * @param {Application} app - Express application interface
 */

export const server : http.Server = http.createServer(app)
server.listen(port)

/**
 * @description Event listener for HTTP server "error" event.
 */

function onError(error: any) : void {
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
  const addr : any  = server.address();
  const bind  = typeof addr === 'string'
      ? `${addr}`
      : `${addr.port}`;

  debugLog(`Server listening on port: ${bind}`);
}

/**
 * @description Listen to error event and handling it
 */
server.on('error', onError);
server.on('listening', onListening);

/**
 * @description Catch unhandled rejections and uncaugth exceptions
 */
process.on('unhandledRejection', (reason : Error, promise : Promise<any>) => {
  throw reason
})

process.on('uncaughtException', (error : Error) => {
  console.error('There was an uncaught err', error)
  process.exit(1)
})
