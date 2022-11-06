# fullstack starter mern.ts

## 1. copy .env files
  - ./app/.env
  - ./api/.env

## 2. copy redis.conf @/api

## 3. declare ports @deploy-env.sh, line:41-44

## 4. set api production address for client and api docs
  - @/app/src/app/store/vars.ts, line:45
  - @/api/apidoc.json, line:6

## 5. allow io @/api/.env, line:55

## 6. install sys
  `$ . ./deploy-env.sh`

## 7. start app
  `$ . ./deploy.sh`
