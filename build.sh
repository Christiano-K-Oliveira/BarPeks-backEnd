#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn build
# yarn typeorm migration:generate ./src/migrations/createTables -d ./src/data-source.ts
yarn typeorm migration:run -d ./src/data-source.ts