'use strict';

var petsApi = require('./src/pets-api');

petsApi.deploy().then(app => {
    console.log("Let's manage pets");
});