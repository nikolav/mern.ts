const { Sequelize } = require('sequelize');
const { pg, isProductionEnv } = require('./vars');
const logger = require('./logger');

module.exports = new Promise(async (resolve, reject) => {
  let connection;
  //
  try {
    connection = new Sequelize(pg, {
      logging: isProductionEnv ? logger.debug.bind(logger) : true,
    });
    // throw if no connection
    await connection.authenticate();
    //
    resolve(connection);
  } catch (error) {
    reject(error);
  }
});
