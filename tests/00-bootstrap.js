'use strict';

//set the environment to test 
process.env.NODE_ENV = "test";

//Load chai
var chai = require('chai');
//See chai that use connect-middleware
// chai.use(require('chai-connect-middleware'));

//set expect to chai.expect
global.expect = chai.expect;