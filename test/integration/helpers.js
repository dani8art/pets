const dc = require('docker-composer-manager');

const api = require('../../src/api');

const DOCKER_COMPOSE_FILE_PATH = '/docker-compose.yaml';

async function setup() {
  try {
    if (process.env.NODE_ENV !== 'ci') {
      await dc.dockerComposeUp(__dirname + DOCKER_COMPOSE_FILE_PATH);
      process.env.MONGO_URL = 'mongodb://localhost:27018/pets';
    }

    return await api.deploy();
  } catch (e) {
    throw new Error(e.message);
  }
}

async function destroy(server) {
  try {
    if (process.env.NODE_ENV !== 'ci') {
      await dc.dockerComposeDown(__dirname + DOCKER_COMPOSE_FILE_PATH);
    }

    await server.stop();
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = { setup, destroy };
