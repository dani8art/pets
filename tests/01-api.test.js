'use strict';

//add test dependencies
var request = require('request'),
    dcManger = require('docker-composer-manager');
//add API module
var src = require('../src/pets-api');

describe('API Test', function () {
    this.timeout(30000);
    var server;

    before(done => {
        dcManger.dockerComposeUp(__dirname + '/docker-compose.yaml').then(out => {
            setTimeout(() => {
                src.deploy().then(api => {
                    server = api;
                    done();
                }, done);
            }, 5000);
        }, done);
    });

    after(done => {
        dcManger.dockerComposeDown(__dirname + '/docker-compose.yaml').then(out => {
            server.close();
            done();
        }, done);
    });

    it('CREATE a new pet test', done => {
        var pet = {
            name: "fuffy",
            tags: ["Cat", "Lazzy"]
        };
        request.post({ url: 'http://localhost:5000/api/v1/pets', body: pet, json: true }, (err, res, body) => {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
    });

    it('GET all pets test', done => {
        request.get({ url: 'http://localhost:5000/api/v1/pets', json: true }, (err, res, body) => {
            if (err) {
                done(err);
            } else {
                expect(body.length).to.be.equal(3);
                done();
            }
        });
    });
});