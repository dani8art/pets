const request = require('request-promise-native');
const dcManger = require('docker-composer-manager');

const src = require('../src/api');

describe('API Test', function() {
  this.timeout(30000);

  let server;
  const commonRequestOpts = {
    url: `http://localhost:${process.env.SERVER_PORT}/api/v1/pets`,
    json: true
  };

  before(async () => {
    try {
      if (process.env.NODE_ENV !== 'ci') {
        await dcManger.dockerComposeUp(__dirname + '/docker-compose.yaml');
        process.env.MONGO_URL = 'mongodb://localhost:27018/pets';
      }

      server = await src.deploy();
    } catch (e) {
      throw new Error(e.message);
    }
  });

  after(async () => {
    try {
      if (process.env.NODE_ENV !== 'ci') {
        await dcManger.dockerComposeDown(__dirname + '/docker-compose.yaml');
      }

      await server.stop();
    } catch (e) {
      throw new Error(e.message);
    }
  });

  it('CREATE a new pet test', async () => {
    const pet = { name: 'fuffy', tags: ['Cat', 'Lazzy'] };

    const response = await request.post({ ...commonRequestOpts, body: pet });
    should.exist(response._id);
  });

  it('GET all pets test', async () => {
    const body = await request.get(commonRequestOpts);
    expect(body._embedded.pets.length).to.be.equal(3);
  });
});
