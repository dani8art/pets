const Hapi = require('@hapi/hapi');
const Mongoose = require('mongoose');

const RestHapiGen = require('rest-hapi-gen');

const Pet = require('./schema/pet');
const Conf = require('./conf');
const initialData = require('./schema/initial-data.json');

async function deploy() {
  let server;
  const conf = Conf();

  try {
    await Mongoose.connect(conf.mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    server = Hapi.server({
      port: conf.server.port,
      host: conf.server.host
    });

    server.events.on('stop', async () => {
      await Mongoose.connection.close();
    });

    const petsCollectionConf = {
      collectionName: 'pets',
      basePath: '/api/v1',
      schema: Pet
    };

    await server.register([{ plugin: RestHapiGen, options: petsCollectionConf }]);

    const initialDataPromises = [];
    if (conf.initialData) {
      const response = await server.inject({
        method: 'GET',
        url: '/api/v1/pets'
      });

      if (response.result._embedded.pets.length <= 0) {
        initialData.forEach(function(pet) {
          initialDataPromises.push(server.inject({ method: 'POST', url: '/api/v1/pets', payload: pet }));
        });
      }
    }

    await Promise.all(initialDataPromises);
    await server.start();

    console.log('Server running on %s', server.info.uri);
  } catch (e) {
    throw new Error(e.message);
  }

  return server;
}

module.exports = {
  deploy
};
