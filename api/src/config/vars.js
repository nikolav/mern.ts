// import .env variables
const path = require('path');
require('dotenv').config();
//
const isTestEnv = process.env.NODE_ENV === 'test';
const isProductionEnv = process.env.NODE_ENV === 'production';

module.exports = {
  // @flags
  isProductionEnv,
  isTestEnv,

  // @env
  env: process.env.NODE_ENV,
  port: process.env.PORT,

  // @logs
  LOGS_PATH: path.join(__dirname, '../../logs'),
  logs: isProductionEnv ? 'combined' : 'dev', // morgan log mode
  ACCESS_LOG: process.env.ACCESS_LOG,
  ERROR_LOG: process.env.ERROR_LOG,
  COMBINED_LOG: process.env.COMBINED_LOG,

  // @paths
  storagePath: path.join(__dirname, '../../storage'),
  pdfTemplatesPath: path.join(__dirname, '../services/pdf'),

  // @secrets
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_SECRET_EXPIRE,
  JWT_SECRET_SESSION: process.env.JWT_SECRET_SESSION,
  JWT_SECRET_SESSION_EXPIRE: process.env.JWT_SECRET_SESSION_EXPIRE,

  // @db
  mongo: {
    uri: isTestEnv
      ? process.env.MONGO_URI_TESTS
      : process.env.MONGO_URI,
  },
  pg: process.env.POSTGRES_URI,

  // @mail
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    defaultFrom: process.env.EMAIL_DEFAULT_FROM,
    defaultTo: process.env.EMAIL_DEFAULT_TO,
  },

  // @misc. config defaults
  defaultPdfTemplate: 'test-doc',
  FAKE_POSTS_URI: process.env.FAKE_POSTS_URI,
  FAKE_USERS_URI: process.env.FAKE_USERS_URI,

  // @guard policies
  ROLE_MAIL_SERVICE_ACCESS: process.env.ROLE_MAIL_SERVICE_ACCESS,
  CAN_SEE_ALL_USER_ROLES: 'can-list-roles',
  CAN_FETCH_USERS_BY_ROLE: 'cat-list-users-by-role',
  // ⚠ passes any policy
  ROLE_HAS_ALL_POLICIES: process.env.ROLE_HAS_ALL_POLICIES,

  // @socket.io allowed client
  CLIENT_IO: process.env.CLIENT_IO,
  CONFIG_IO: {
    public_channel: 'public',
  },
};
