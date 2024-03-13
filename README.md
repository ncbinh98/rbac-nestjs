<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migartions

"migration:run": Run migration from migration folder database/migrations

"migration:generate": Generate migration files changes in entity database

"migration:create": Create empty migration file

"migration:revert": Revert the changes

## Debug MetaData Notfound Typeorm 0.3.2

https://medium.com/@JorgeSantanaDeveloper/troubleshooting-the-no-metadata-was-found-error-in-typeorm-2fab1003b099

https://stackoverflow.com/questions/72535879/getconnection-getrepository-typeorm-is-deprecated <- remember init datasource

## Documents

### CASL

- CASL: https://mfi.engineering/extensible-and-secure-authorization-with-nestjs-and-casl-c6f6d1ceefd5

- Suport inheritance role: https://stackoverflow.com/questions/20215744/how-to-create-a-mysql-hierarchical-recursive-query

- Support retricting fields

- RBAC: https://medium.com/yavar/casl-roles-with-persisted-permissions-in-nestjs-152129f4a6fb

### Caching

- Setup redis in nestjs https://medium.com/@mut1aq/using-redis-in-nestjs-8ca1a009670f (using package cache-manager-redis-yet instead, bc ttl issues)

- Setup redis docker: https://geshan.com.np/blog/2022/01/redis-docker/

- Remove cache by key pattern: https://tech.oyorooms.com/finding-and-deleting-the-redis-keys-by-pattern-the-right-way-123629d7730

### Setup Migration Typeorm Nestjs

- Ref Implement Migration Typeorm NestJS https://dev.to/amirfakour/using-typeorm-migration-in-nestjs-with-postgres-database-3c75

### Distributed Counter System

- https://systemdesign.one/distributed-counter-system-design/ (count something...)
