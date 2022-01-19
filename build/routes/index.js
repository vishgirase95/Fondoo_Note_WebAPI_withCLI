"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./user.route"));

var router = _express["default"].Router();

/**
 * Function contains Application routes
 *
 * @returns router 
 */
var routes = function routes() {
  router.get('/', function (req, res) {
    res.send('Welcome');
  });
  router.use('/register', _user["default"]);
  return router;
};

var _default = routes;
exports["default"] = _default;