"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = require("../models/user");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _validator = require("../helpers/validator");

var _checkAuth = require("../middleware/check-auth");

var _joi = _interopRequireDefault(require("joi"));

// const User = require('../models/user')

/**
 * Declaration of the Mailsender 
 */
var transporter = _nodemailer["default"].createTransport({
  service: "gmail",
  auth: {
    user: "mukilselvam27@gmail.com",
    pass: 'Mukil@123'
  }
});
/**
 * Function that creates a new user
 * Valid user information should be passed to create a user
 */


exports.signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _bcrypt["default"].hash(req.body.password, 10, function (error, hash) {
              if (error) {
                return res.status(500).json({
                  error: err
                });
              } else {
                var user = new _user.User({
                  _id: _mongoose["default"].Types.ObjectId(),
                  name: req.body.name,
                  mobile: req.body.mobile,
                  email: req.body.email,
                  password: hash
                });
                var options = {
                  abortEarly: false,
                  // include all errors
                  allowUnknown: true,
                  // ignore unknown props
                  stripUnknown: true // remove unknown props

                };

                var _authSchema$validate = _validator.authSchema.validate(req.body, options),
                    _error = _authSchema$validate.error,
                    value = _authSchema$validate.value;

                if (_error) {
                  return res.status(500).json({
                    message: "Validation error: ".concat(_error.details.map(function (x) {
                      return x.message;
                    }).join(','))
                  });
                } else {
                  user.save().then(function (result) {
                    console.log(result);
                    var options = {
                      from: "mukilselvam27@gmail.com",
                      to: req.body.email,
                      subject: "Welcome Mail",
                      text: "Hi  ".concat(req.body.name, " , Welcome, to our Nodejs Application")
                    };
                    transporter.sendMail(options, function (err, info) {
                      if (err) {
                        console.log(err);
                        return;
                      }

                      console.log(info.response);
                    });
                    res.status(201).json({
                      message: 'User Created Successfully',
                      createduser: result
                    });
                  })["catch"](function (err) {
                    console.log(err);
                    res.status(500).json({
                      error: err,
                      message: 'Invalid Details'
                    });
                  });
                }
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Allows to login a user
 */


exports.login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _user.User.find({
              email: req.body.email
            }).exec().then(function (user) {
              if (user.length < 1) {
                return res.status(401).json({
                  message: 'Auth failed'
                });
              }

              _bcrypt["default"].compare(req.body.password, user[0].password, function (err, result) {
                if (result) {
                  var _token = _jsonwebtoken["default"].sign({
                    email: user[0].email,
                    userId: user[0]._id
                  }, "secret", {
                    expiresIn: "1h"
                  });

                  return res.status(200).json({
                    message: "Auth Successful",
                    token: _token
                  });
                }

                res.status(401).json({
                  message: 'Invalid Password  '
                });
              });
            })["catch"](function (err) {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Function that allows to update the user by his id
 */


exports.update = function (req, res, next) {
  var id = req.params.userId;

  _user.User.updateMany({
    _id: id
  }, {
    $set: req.body
  }).exec().then(function (result) {
    console.log(result);
    res.status(200).json(result);
  })["catch"](function (err) {
    res.status(500).json({
      error: err
    });
  });
};
/**
 *  Function that allows to Delete the user by his id
 */


exports.delete_user = function (req, res, next) {
  var id = req.params.userId;

  _user.User.remove({
    _id: id
  }).exec().then(function (result) {
    res.status(200).json(result);
  })["catch"](function (error) {
    res.status(500).json({
      error: error
    });
  });
};
/**
 *  Function that allows to get all the users
 */


exports.all_users = function (req, res, next) {
  var _req$query = req.query,
      _req$query$page = _req$query.page,
      page = _req$query$page === void 0 ? req.params.page : _req$query$page,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === void 0 ? req.params.limit : _req$query$limit;

  _user.User.find().limit(limit * 1).skip((page - 1) * limit).select('name email mobile').exec().then(function (docs) {
    var response = {
      count: docs.length,
      users: docs
    };
    res.status(200).json(response);
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};
/**
 *  Function that allows to Get a user by his id
 */


exports.user_by_id = function (req, res, next) {
  var id = req.params.userId;

  _user.User.findById(id).exec().then(function (doc) {
    console.log(doc);

    if (doc) {
      res.status(200).json({
        name: doc.name,
        mail: doc.email,
        mobile: doc.mobile
      });
    } else {
      res.status(404).json({
        message: 'No Matching Id '
      });
    }
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};