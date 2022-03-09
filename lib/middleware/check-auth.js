"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var token = function token(req, res, next) {
  try {
    var _token = req.headers.authorization.split(" ")[1];

    var decoded = _jsonwebtoken["default"].verify(_token, process.env.JWT_KEY);

    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(404).json({
      message: "invalid token"
    });
  }
};

exports.token = token;