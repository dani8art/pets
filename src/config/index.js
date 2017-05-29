'use strict';

var fs = require('fs'),
    jsyaml = require('js-yaml');


module.exports = jsyaml.safeLoad(fs.readFileSync(__dirname + '/config.yaml'))[process.env.NODE_ENV || 'development'];
