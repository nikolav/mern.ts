const chalk = require('chalk');
const { faker } = require('@faker-js/faker');
const { hashSync } = require('bcryptjs');
const model = require('../../models/sequelize');
const User = require('../../models/user.model');
const { testId, range, map } = require('../../utils');
const mongoose = require('../../config/mongoose');

module.exports = (program) => {
  const dbCmd = program.command('db');
  const dbCmdSeed = dbCmd.command('seed');

  dbCmdSeed
    .command('users')
    .description('seeds users collection')
    .argument('[count]', 'add random users to db', 1)
    // eslint-disable-next-line no-unused-vars
    .action(async (count = 1, command) => {
      if (!(0 < count)) return;
      mongoose.connect();
      await User.insertMany(
        map(range(count), () => ({
          name: faker.name.fullName(),
          email: faker.internet.email(),
          password: hashSync('122333', 1),
        }))
      );
      //
      console.log(chalk.green(`@users table seeded, [${count}] added`));
    });

  dbCmdSeed
    .command('vars')
    .description('seeds vars/main table')
    .argument('[count]', 'add random vars to db', 1)
    // eslint-disable-next-line no-unused-vars
    .action(async (count = 1, command) => {
      if (!(0 < count)) return;
      const { Main } = await model;
      await Main.bulkCreate(
        map(range(count), () => ({
          name: `x.${testId()}`,
          value: testId(),
        })),
        {
          validation: true,
        }
      );
      //
      console.log(chalk.green(`@main table seeded, [${count}] added`));
    });
};
