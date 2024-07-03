#!/bin/sh

mongod --fork --config /etc/mongod.conf

npm run test:run

npm run test:coverage
