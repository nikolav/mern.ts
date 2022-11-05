const range = require('lodash/range');
const map = require('lodash/map');

module.exports = {
  groupByCount: require('./group-by-count'),
  gzip: require('./gzip'),
  hasOwn: require('./has-own'),
  inlineTemplate: require('./inline-template'),
  map,
  Next: require('./next-middleware'),
  pickValues: require('./pick-values'),
  range,
  resolverContext: require('./resolver-context'),
  resolverMiddlewares: require('./resolver-middlewares'),
  setDownloadHeaders: require('./set-download-headers'),
  testId: require('./test-id'),
  validation: require('./run-validation'),
};
