const range = require('lodash/range');
const map = require('lodash/map');
const clamp = require('lodash/clamp');
const identity = require('lodash/identity');
const False = () => false;
const True = () => true;

module.exports = {
  clamp,
  False,
  groupByCount: require('./group-by-count'),
  gzip: require('./gzip'),
  hasOwn: require('./has-own'),
  identity,
  inlineTemplate: require('./inline-template'),
  map,
  Next: require('./next-middleware'),
  pickValues: require('./pick-values'),
  range,
  resolverContext: require('./resolver-context'),
  resolverMiddlewares: require('./resolver-middlewares'),
  setDownloadHeaders: require('./set-download-headers'),
  testId: require('./test-id'),
  True,
  validation: require('./run-validation'),
};
