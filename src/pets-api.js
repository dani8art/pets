'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    baucis = require('baucis'),
    config = require('./config'),
    Promise = require('bluebird');

mongoose.Promise = Promise;

module.exports = {
    deploy: deploy
};


function deploy() {
    return new Promise((resolve, reject) => {

        var PetsModel = mongoose.model('pets', new mongoose.Schema(require('./schema/pet.json')));
        // Create a simple controller.  By default these HTTP methods
        // are activated: HEAD, GET, POST, PUT, DELETE
        baucis.rest('pets');

        var app = express();
        //add cors support
        app.use(cors());
        //add api resources
        app.use('/api/v1/', baucis());
        //add UI
        app.use('/', express.static(__dirname + '/../public/app/'));
        app.use('/bower_components', express.static(__dirname + '/../public/bower_components/'));

        var port = config.port;

        var server = app.listen(port, err => {

            var promises = [mongoose.connect(config.db.mongoUrl, {
                useMongoClient: true,
            })];

            if (config.initialData == 'true') {
                var data = require('./schema/initialData.json');
                data.forEach(function (pet) {
                    promises.push(new PetsModel(pet).save());
                });
            }

            if (err) {
                reject(err);
            } else {
                Promise.all(promises).then(ret => {
                    console.log("Your API is running on (http://localhost:%d)", port);
                    resolve(server);
                }, reject);
            }
        });
    });

}