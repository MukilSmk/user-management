"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = require("../index.js");

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);
/**
 *Test cases for retrieving the users
 */


describe('Users API', function () {
  describe("GET/users/", function () {
    it("It should get all the USERS", function (done) {
      _chai["default"].request(_index.server).get("/users/").end(function (err, response) {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('count');
        response.body.should.have.property('users');
        done();
      });
    });
    it("It should not get all the USERS", function (done) {
      _chai["default"].request(_index.server).get("/user").end(function (err, response) {
        response.should.have.status(404);
        done();
      });
    });
  });
  /**
  * 
  *Test the GET(by id) Route
  */

  describe("GET/users/:userId", function () {
    var userId = "61ca88ee4eefc149aec11b9b";
    it("It should get the User by id", function (done) {
      _chai["default"].request(_index.server).get("/users/" + userId).end(function (err, response) {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.should.have.property('mail');
        response.body.should.have.property('mobile');
        done();
      });
    });
    it("It should Not get the User by id", function (done) {
      var userId = "61ca88ee4eefc149aec11b9b";

      _chai["default"].request(_index.server).get("/user/" + userId).end(function (err, response) {
        response.should.have.status(404);
        done();
      });
    });
  });
});