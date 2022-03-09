"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = require("../index.js");

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);
/**
 * Test case for the login route
 */


describe("POST/users/login", function () {
  it("It should login the  existing User ", function (done) {
    var user = {
      "email": "kavinkumar@gmail.com",
      "password": "Hash@123!"
    };

    _chai["default"].request(_index.server).post("/users/login").send(user).end(function (err, response) {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('message');
      response.body.should.have.property('token');
      done();
    });
  });
  it("It should not login the User ", function (done) {
    var user = {
      "email": "kavinkumar@gmail.com",
      "password": "Hash@12!"
    };

    _chai["default"].request(_index.server).post("/users/login").send(user).end(function (err, response) {
      response.should.have.status(401);
      response.body.should.be.a('object');
      response.body.should.have.property('message').eq("Invalid Password  ");
      done();
    });
  });
  it("It should Not get into the login route ", function (done) {
    _chai["default"].request(_index.server).post("/user/login").end(function (err, response) {
      response.should.have.status(404);
      done();
    });
  });
});