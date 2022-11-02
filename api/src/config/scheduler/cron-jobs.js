const logger = require('../logger');
const moment = require('moment-timezone');

module.exports = {
  logDate: () => logger.info(`@scheduler.onTick.logDate | ${moment()}`),
};
