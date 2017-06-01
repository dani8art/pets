'use strict';

var fs = require('fs'),
    jsyaml = require('js-yaml');


module.exports = jsyaml.safeLoad(fs.readFileSync(__dirname + '/config.yaml'))[process.env.NODE_ENV || 'development'];

module.exports.initialData = process.env.PETS_INITIAL_DATA || module.exports.initialData;