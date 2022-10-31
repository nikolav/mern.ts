FROM node:16.14.0

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package*.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn run build

ENV PORT 3000
EXPOSE $PORT

CMD [ "yarn", "start" ]
