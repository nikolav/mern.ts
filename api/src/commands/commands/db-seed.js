const model = require('../../models/sequelize');
const { testId } = require('../../utils');

module.exports = (program) => {
  const dbCmd = program.command('db');
  dbCmd
    .command('seed')
    .description('seed database with random data')
    // eslint-disable-next-line no-unused-vars
    .action(async (args, command) => {
      const { Main } = await model;
      const res = await Main.create({
        name: `x --${testId()}`,
        value: testId(),
      });
      console.log(res);
    });
};
