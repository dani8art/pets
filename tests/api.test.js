const request = require("request");
const dcManger = require("docker-composer-manager");

const src = require("../src/pets-api");

describe("API Test", function() {
  this.timeout(30000);
  let server;

  before(done => {
    dcManger.dockerComposeUp(__dirname + "/docker-compose.yaml").then(out => {
      setTimeout(() => {
        src.deploy().then(api => {
          server = api;
          done();
        }, done);
      }, 5000);
    }, done);
  });

  after(done => {
    dcManger
      .dockerComposeDown(__dirname + "/docker-compose.yaml")
      .then(() => {
        return server.stop();
      })
      .then(done)
      .catch(done);
  });

  it("CREATE a new pet test", done => {
    const pet = {
      name: "fuffy",
      tags: ["Cat", "Lazzy"]
    };
    request.post(
      {
        url: `http://localhost:${process.env.SERVER_PORT}/api/v1/pets`,
        body: pet,
        json: true
      },
      (err, res, body) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      }
    );
  });

  it("GET all pets test", done => {
    request.get(
      {
        url: `http://localhost:${process.env.SERVER_PORT}/api/v1/pets`,
        json: true
      },
      (err, res, body) => {
        if (err) {
          done(err);
        } else {
          expect(body._embedded.pets.length).to.be.equal(3);
          done();
        }
      }
    );
  });
});
