// const moment = require('moment-timezone');
// const chalk = require('chalk');
const mongoose = require('../../config/mongoose');
const User = require('../../models/user.model');

module.exports = (program) => {
  mongoose.connect();

  const cmdFake = program.command('fake');
  const cmdAddFake = cmdFake.command('add');

  cmdAddFake
    .command('user')
    .description('add fake user to db')
    .argument('[count]', 'add fake user to db', 1)
    .action(async (count, command) => {
      // const { debug, verbose } = command;
      // console.log(chalk.blue(moment().toLocaleString()));
      console.log({ count });
    });
};

// // Add nested commands using `.command()`.
// const brew = program.command('brew');
// brew
//   .command('tea')
//   .action(() => {
//     console.log('brew tea');
//   });
// brew
//   .command('coffee')
//   .action(() => {
//     console.log('brew coffee');
//   });
