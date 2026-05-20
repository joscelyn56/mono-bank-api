import "reflect-metadata"; // this shim is required
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import log4js from 'log4js';

// require('appmetrics-dash').attach();
// require('appmetrics-prometheus').attach();

const appName = "Mono Api";
const logger = log4js.getLogger(appName);
const path = require('path');

useContainer(Container);// creates express app, registers all controller routes and returns // you express app instance
const app = createExpressServer({
  routePrefix: "/api",
  controllers: [__dirname + './controllers/*.ts']
});

app.use(log4js.connectLogger(logger, {
  level: process.env.LOG_LEVEL || 'info'
}));
// require('./routers/index')(app);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("started");
  // logger.info(`Mono API listening on http://localhost:${port}/appmetrics-dash`);
  // logger.info(`OpenAPI (Swagger) spec is available at http://localhost:${port}/swagger/api`);
  // logger.info(`Swagger UI is available at http://localhost:${port}/explorer`);
});

app.use(function (req: any, res: any, next: any) {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

app.use(function (err: any, req: any, res: any, next: any) {
  res.sendFile(path.join(__dirname, '../public', '500.html'));
});
