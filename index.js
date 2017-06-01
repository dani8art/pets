'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    baucis = require('baucis'),
    config = require('./src/config');

mongoose.connect(config.db.mongoUrl);

var petsSchema = require('./src/schema/pet.json');

var Pets = new mongoose.Schema(petsSchema);
// Register new models with mongoose.
var PetsModel = mongoose.model('pets', Pets);
// Create a simple controller.  By default these HTTP methods
// are activated: HEAD, GET, POST, PUT, DELETE
baucis.rest('pets');
// Create the app and listen for API requests
var app = express();
//add cors support
app.use(cors());
//add api resources
app.use('/api/v1/', baucis());
//add UI
app.use('/', express.static(__dirname + '/public/app/'));
app.use('/bower_components', express.static(__dirname + '/public/bower_components/'));

var port = config.port;

app.listen(port, () => {
    if (config.initialData == 'true') {
        var data = require('./src/schema/initialData.json');
        data.forEach(function (pet) {
            new PetsModel(pet).save();
        });
    }
    console.log("Your API is running on (http://localhost:%d)", port);
});