const chai = require('chai');
global.expect = chai.expect;
global.should = chai.should();

const request = require('request-promise-native');

const { setup, destroy } = require('./helpers');

process.env.SERVER_PORT = 4002;

describe('Pets API Integration Tests', function() {
  this.timeout(30000);

  let server;
  const reqOpts = {
    url: `http://localhost:${process.env.SERVER_PORT}/api/v1/pets`,
    json: true
  };

  before(async () => (server = await setup()));

  after(async () => await destroy(server));

  describe('CREATE', () => {
    it('when a valid pet is sent should return a new pet', async () => {
      const pet = { name: 'fuffy', tags: ['Cat', 'Lazzy'] };
      const response = await request.post({ ...reqOpts, body: pet });

      should.exist(response._id);
      expect(response.name).to.equal(pet.name);
      expect(response.tags).to.deep.equal(pet.tags);
    });

    it('when a not valid pet is sent should return validation error', async () => {
      const pet = { tags: ['Cat', 'Lazzy'] };
      let response;

      try {
        response = await request.post({ ...reqOpts, body: pet });
      } catch (e) {
        expect(e.statusCode).to.equal(400);
        expect(e.error.message).to.equal('Invalid request payload input');
        expect(e.error.error).to.equal('Bad Request');
      }

      should.not.exist(response);
    });
  });

  describe('GET', () => {
    it('should return all pets', async () => {
      const response = await request.get(reqOpts);
      expect(response._embedded.pets.length).to.be.equal(3);
    });
  });
});
