"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var userSchema = new _mongoose["default"].Schema({
  FirstName: {
    type: String,
    trim: true
  },
  LastName: {
    type: String,
    trim: true
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Password: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

var User = _mongoose["default"].model("User", userSchema);

exports.User = User;