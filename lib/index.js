"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

var swaggerJsdocs = _yamljs["default"].load('./src/api.yaml');
/**
 * express declaration
 */


var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
var port = process.env.PORT || 3000;

_mongoose["default"].connect('mongodb://localhost:27017/user-list');

_mongoose["default"].connection.once('open', function () {
  console.log('DB connected');
}).on('error', function (error) {
  console.log('error is:', error);
});
/**
 * Bodyparser Middleware
 */


app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
/**
 *Swagger Route Middleware
 */

app.use("/api-docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerJsdocs));
/**
 * Routes Middleware
 */

app.use('/users', _users["default"]);
/**
 * Error Creation Middleware
 */

app.use(function (req, res, next) {
  var error = new Error("not found");
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
/**
 * Server statement
 */

var server = app.listen(port, function () {
  console.log("Server running on ".concat(port));
}); // module.exports = servers

exports.server = server;