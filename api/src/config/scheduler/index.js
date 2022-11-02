const { CronJob } = require('cron');
const { AT_MIDNIGHT } = require('./cron-time-formats');
const { logDate, mailErrorLog } = require('./cron-jobs');

// https://www.npmjs.com/package/cron
// https://github.com/kelektiv/node-cron/tree/master/examples

const job1 = new CronJob(AT_MIDNIGHT, logDate);
const job2 = new CronJob(AT_MIDNIGHT, mailErrorLog);

// let date = new Date();
// date.setSeconds(date.getSeconds() + 2);
// const jobAtDate = new CronJob(date, function () {
//   const d = new Date();
//   console.log('Specific date:', date, ', onTick at:', d);
// });

job1.start();
job2.start();
// jobAtDate.start();
