const API_GRAPHQL_dev = "http://localhost:3001/v1/graphql"
const API_URL_dev = "http://localhost:3001/v1"
const FILE_DOWNLOAD_URL_dev = "http://localhost:3001/v1/download"
const FILE_UPLOAD_URL_dev = "http://localhost:3001/v1/upload"
const IO_dev = "http://localhost:3001/"
const PDF_DOWNLOAD_URI_dev = "http://localhost:3001/v1/download/pdf"
const SEND_MAIL_URL_dev = "http://localhost:3001/v1/mail"

const API_GRAPHQL_production = "http://80.240.17.71:8081/v1/graphql"
const API_URL_production = "http://80.240.17.71:8081/v1"
const FILE_DOWNLOAD_URL_production = "http://80.240.17.71:8081/v1/download"
const FILE_UPLOAD_URL_production = "http://80.240.17.71:8081/v1/upload"
const IO_production = "http://80.240.17.71:8081/"
const PDF_DOWNLOAD_URI_production =
  "http://80.240.17.71:8081/v1/download/pdf"
const SEND_MAIL_URL_production = "http://80.240.17.71:8081/v1/mail"

// @@DEV
// const API_GRAPHQL = API_GRAPHQL_dev
// const API_URL = API_URL_dev
// const AUTH_API_URL = "http://localhost:3001/v1/auth/login"
// const AUTH_API_URL_logout = "http://localhost:3001/v1/session"
// const AUTH_API_URL_register = "http://localhost:3001/v1/auth/register"
// const AUTH_API_URL_session = "http://localhost:3001/v1/session"
// const AUTH_API_URL_users = "http://localhost:3001/v1/users"
// const FILE_DOWNLOAD_URL = FILE_DOWNLOAD_URL_dev
// const FILE_UPLOAD_URL = FILE_UPLOAD_URL_dev
// const IO_SERVER = IO_dev
// const PDF_DOWNLOAD_URI = PDF_DOWNLOAD_URI_dev
// const SEND_MAIL_URL = SEND_MAIL_URL_dev

// @@PRODUCTION
const API_GRAPHQL = API_GRAPHQL_production;
const API_URL = API_URL_production;
const AUTH_API_URL = "http://80.240.17.71:8081/v1/auth/login";
const AUTH_API_URL_logout = "http://80.240.17.71:8081/v1/session";
const AUTH_API_URL_register = "http://80.240.17.71:8081/v1/auth/register";
const AUTH_API_URL_session = "http://80.240.17.71:8081/v1/session";
const AUTH_API_URL_users = "http://80.240.17.71:8081/v1/users";
const FILE_DOWNLOAD_URL = FILE_DOWNLOAD_URL_production;
const FILE_UPLOAD_URL = FILE_UPLOAD_URL_production;
const IO_SERVER = IO_production;
const PDF_DOWNLOAD_URI = PDF_DOWNLOAD_URI_production;
const SEND_MAIL_URL = SEND_MAIL_URL_production

const AUTH_SESSION_TOKEN = "drhhmxbdpkf"

const REST_RESOURCE_main = "variables"
const REST_RESOURCE_messages = "messages"

//
export { useAppData } from "./appdata"
export { useIO } from "../providers"
export { useColorModeTW, MODE_DARK } from "./color-mode-tw"
export { useColorMode } from "../providers"
export {
  API_GRAPHQL_dev,
  API_GRAPHQL_production,
  API_GRAPHQL,
  API_URL_dev,
  API_URL_production,
  API_URL,
  AUTH_API_URL_logout,
  AUTH_API_URL_register,
  AUTH_API_URL_session,
  AUTH_API_URL_users,
  AUTH_API_URL,
  AUTH_SESSION_TOKEN,
  FILE_DOWNLOAD_URL_dev,
  FILE_DOWNLOAD_URL_production,
  FILE_DOWNLOAD_URL,
  FILE_UPLOAD_URL_dev,
  FILE_UPLOAD_URL_production,
  FILE_UPLOAD_URL,
  IO_dev,
  IO_production,
  IO_SERVER,
  PDF_DOWNLOAD_URI_dev,
  PDF_DOWNLOAD_URI_production,
  PDF_DOWNLOAD_URI,
  REST_RESOURCE_main,
  REST_RESOURCE_messages,
  SEND_MAIL_URL_dev,
  SEND_MAIL_URL_production,
  SEND_MAIL_URL,
}
