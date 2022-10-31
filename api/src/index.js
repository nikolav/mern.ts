// eslint-disable-next-line no-global-assign
const http = require('http');
Promise = require('bluebird');

const { port, env } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const logger = require('./config/logger');
const { IO } = require('./config/io');

mongoose.connect();

const server = http
  .createServer(app)
  .listen(port, () =>
    logger.info(`server started on port ${port} (${env})`)
  );

// const serverSelfSignedCert =
//   https.createServer({ key, cert }, app)
//     .listen(port, () => logger.info(`server started on port ${port} (${env})`));

(async () => await IO(server))();

module.exports = app;
