# Vehicle managment system

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Vehicle management system created as part of an engineering thesis by Lublin University of Technology students. This repo contains API created using [Nest](https://github.com/nestjs/nest) framework.

## Documentation
Swagger documentation is avalible in route /docs, after application is launched

## Installation

For these project you need to have installed [nodeJS](https://nodejs.org/en/download/) version 16 or higher. If that requirement is satisfied, you can install all npm modules by running command below.

At this point it is also required to have running sql server with project database (see [Database migrations](#database-migrations))

```bash
$ npm install
```
In addition to installing the npm modules, the `.env` file must be added to the root directory. For the development environment, the `development.env` file is read, and for the production environment, the `.env` file is read.
Application has two environments: development and production. By default, development environment is used. NPM scripts are set up to correct environment, but it can be modified in `package.json` file.
 It should look like example below.

```bash
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=db_name

# JWT secret
JWT_SECRET=secret
```

## Running the app

```bash
# develpmment commands
# development
$ npm run start

# watch mode
$ npm run start:dev

# production commands
# deploy
$ npm run deploy

# start in production
$ npm run start:prod
```

## Test (not implemented yet)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Database migrations

For initializing project database you should just run latest migration (`migration:run` command). Every migration command runs in development environment by default. You can add suffix `:prod` to run it in production environment.

```bash
# generate migration
$ npm run migration:generate <path_to_migration_file>

# run migration
$ npm run migration:run

# revert migration
$ npm run migation:revert
```

## Contributors

- Jakub Maciej Tkaczyk - backend developer, [Github](https://github.com/MowMiKubek)
- Adam Walachniewicz - frontend developer [Github](https://github.com/AdamWalachniewicz)
- Radosław Tomczyk - mobile/frontend developer, [Github](https://github.com/radektomczyk)
- dr Beata Pańczyk - thesis supervisor
