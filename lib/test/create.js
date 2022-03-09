"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = require("../index.js");

// const chai = require("chai")
// const chaiHttp = require("chai-http")
// const server = require('../index')
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);
/**
 * Test Case for creating a User
 */


describe("Post /users/signup", function () {
  it("POST a USER ", function (done) {
    var user = {
      name: "Mathankumar",
      email: "Ruban0@gmail.com",
      mobile: 8133338078,
      password: "Kavin@132Sa!"
    };

    _chai["default"].request(_index.server).post("/users/signup").send(user).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('createduser');
      done();
    });
  });
  it("It should not POST a user", function (done) {
    var users = {
      name: "Mathankumar",
      email: "Rubagmail.com",
      mobile: 8633338178,
      password: "Kavin@132Sa!"
    };

    _chai["default"].request(_index.server).post("/users/signup").send(users).end(function (err, res) {
      res.should.have.status(500);
      done();
    });
  });
  it("It should not get into the user creating route", function (done) {
    var users = {
      name: "Mathankumar",
      email: "Ruban17@gmail.com",
      mobile: 8633438878,
      password: "Kavin@132Sa!"
    };

    _chai["default"].request(_index.server).post("/user/signup").send(users).end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});