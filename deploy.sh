#!/bin/bash
sleep 1

. ./api/install.sh
. ./app/install.sh

docker-compose up -d --build
docker exec -it restapi yarn run db:upsert
