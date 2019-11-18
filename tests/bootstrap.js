"use strict";

//set the environment to test
process.env.MONGO_URL = "mongodb://localhost:27018/pets";
process.env.SERVER_PORT = 4002;

//Load chai
var chai = require("chai");
//See chai that use connect-middleware
// chai.use(require('chai-connect-middleware'));

//set expect to chai.expect
global.expect = chai.expect;
