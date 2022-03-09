"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = require("../index.js");

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);
/**
* 
*Test cases for the delete route
*/


describe('Users API', function () {
  describe("DELETE/users/", function () {
    it("It should DELETE the   User ", function (done) {
      var userId = "61c95206749f64309b8e377d";

      _chai["default"].request(_index.server)["delete"]("/users/delete/" + userId).end(function (err, response) {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property("deletedCount").eq(1);
        done();
      });
    });
    it("It should not delete the user", function (done) {
      var userId = "61c94e8b9eecadc69edae2f7";
      var user = {
        "name": "KEVINKUMAR"
      };

      _chai["default"].request(_index.server).get("/users/delete" + userId).end(function (err, response) {
        response.should.have.status(500);
        done();
      });
    });
  });
});