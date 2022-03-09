"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = require("../controllers/users");

var _validator = require("../helpers/validator");

var router = _express["default"].Router();
/**
 * Routes
 */


router.post('/signup', _users.signup);
router.post('/login', _users.login);
router.patch('/update/:userId', _users.update);
router["delete"]('/delete/:userId', _users.delete_user);
router.get('/all-users', _users.all_users);
router.get('/:userId', _users.user_by_id);
var _default = router;
exports["default"] = _default;