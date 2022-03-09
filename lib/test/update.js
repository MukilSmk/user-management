"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = require("../index.js");

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Users API', function () {
  /**
   * 
   *Test the PATCH Route
   */
  describe("PATCH/users/", function () {
    it("It should UPDATE the  existing User ", function (done) {
      var userId = "61cab71285a49d168ce4d55e";
      var user = {
        "name": "KEVINKUMAR"
      };

      _chai["default"].request(_index.server).patch("/users/update/" + userId).send(user).end(function (err, response) {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property("acknowledged").eq(true);
        response.body.should.have.property("modifiedCount").eq(1);
        response.body.should.have.property("matchedCount").eq(1);
        done();
      });
    });
    it("It should Not get the update route", function (done) {
      var userId = "61cab71285a49d168ce4d55";
      var user = {
        "name": "KEVINKUMAR"
      };

      _chai["default"].request(_index.server).get("/user/update" + userId).end(function (err, response) {
        response.should.have.status(404);
        done();
      });
    });
    it("It should Not get the update route", function (done) {
      var userId = "61c69168a49a646c551b4b1c";
      var user = {
        "name": "KEVINKUMAR"
      };

      _chai["default"].request(_index.server).get("/users/update" + userId).end(function (err, response) {
        response.should.have.status(500);
        done();
      });
    });
  });
});