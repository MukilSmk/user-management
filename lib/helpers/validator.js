"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var authSchema = _joi["default"].object({
  name: _joi["default"].string().required().messages({
    'string.base': "\"name\" should be a type of 'text'",
    'string.empty': "\"name\" cannot be an empty field"
  }),
  email: _joi["default"].string().email().lowercase().required(),
  mobile: _joi["default"].number().required(),
  password: _joi["default"].string().min(6).required()
}); // module.exports = {authSchema}


exports.authSchema = authSchema;