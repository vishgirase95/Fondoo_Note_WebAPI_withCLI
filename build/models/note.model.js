"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notes = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var noteSchema = new _mongoose["default"].Schema({
  Title: {
    type: String,
    required: true,
    trim: true
  },
  Descreption: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  isArchived: {
    type: Boolean,
    trim: true
  },
  isDeleted: {
    type: Boolean,
    trim: true
  },
  UserID: {
    type: String
  }
}, {
  timestamps: true
});

var Notes = _mongoose["default"].model('Notes', noteSchema);

exports.Notes = Notes;