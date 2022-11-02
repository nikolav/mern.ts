const { CronJob } = require('cron');
const { AT_MIDNIGHT } = require('./cron-time-formats');
const { logDate } = require('./cron-jobs');

// https://www.npmjs.com/package/cron
// https://github.com/kelektiv/node-cron/tree/master/examples

const job = new CronJob(AT_MIDNIGHT, logDate);

// const job2 = new CronJob('*/8 * * * * *', function () {
//   console.log('Second Job');
// });

// let date = new Date();
// date.setSeconds(date.getSeconds() + 2);
// const jobAtDate = new CronJob(date, function () {
//   const d = new Date();
//   console.log('Specific date:', date, ', onTick at:', d);
// });

job.start();
// job2.start();
// jobAtDate.start();
