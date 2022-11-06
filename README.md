# fullstack starter mern.ts

## 1. copy .env files
  - ./reactapp/.env
  - ./restapi--express/.env

## 2. copy redis.conf @/api

## 3. declare ports @deploy-env.sh, line:39-41

## 4. set api production address for client and api docs
  - @/reactapp/src/app/store/index.js, line:28-32
  - @/restapi--express/apidoc.json, line:6

## 5. allow io @/restapi--express/.env, line:41

## 6. install sys
  `$ . ./deploy-env.sh`

## 7. start app
  `$ . ./deploy.sh`
