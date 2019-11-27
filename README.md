# Pets API

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![CircleCI](https://circleci.com/gh/dani8art/pets.svg?style=svg)](https://circleci.com/gh/dani8art/pets) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

> This repository contains an example of a RESTful API which is developed in Node.js, using MongoDB and [RESTHapi Gen](https://github.com/dani8art/rest-hapi-gen). The main objective of this project is to have a microservice for testing cloud native tools, infrastructures, Node.js plugins and more.

See [live demo](https://pets.darteaga.com)

### Support

- `Node.js >= 12.x`

## TL;DR;

#### Clone

```shell
git clone https://github.com/dani8art/pets.git
```

#### Install dependecies

```shell
cd pets && npm i
```

#### Run

```shell
npm start
```

## Pets API configuration

It can be configured using some environment variable.

| Option            | Type      | Description                                                                                                  |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| MONGO_URL         | `string`  | `Optional` The mongo URL to be used by mongoose. Default: `mongodb://localhost:27017/pets`.                  |
| PETS_INITIAL_DATA | `boolean` | `Optional` Whether an initial data should be loaded. Default: `true`.                                        |
| SERVER_ADDRESS    | `string`  | `Optional` IP address where the server is attached. Default: `0.0.0.0`.                                      |
| SERVER_HOSTNAME   | `string`  | `Optional` Hostname where the server is exposed, It is used to generate HATEOAS links. Default: `localhost`. |
| SERVER_PORT       | `string`  | `Optional` Port where the server is attached. Default: `4001`.                                               |

## Deploy using docker

#### docker

```shell
docker run -d --name my-mongo mongo
```

```shell
docker run -d --name my-pets --link my-mongo:my-mongo -e MONGO_URL=mongodb://my-mongo/pets -p 4001:4001 darteaga/pets
```

#### docker-compose

```shell
curl -sSL https://raw.githubusercontent.com/dani8art/pets/master/docker-compose.yaml > docker-compose.yaml
```

```shell
docker-compose up -d
```

## License

Pets API is [MIT licensed](./LICENSE).
