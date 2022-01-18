"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.resetPassword = exports.newUser = exports.login = exports.isArchived = exports.getNote = exports.forgetPassword = exports.findtrashed = exports.addNote = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _note = require("../models/note.model");

var _sendmail = require("../middlewares/sendmail");

var _user = require("../models/user.model");

var _transports = require("winston/lib/winston/transports");

var _winston = require("winston");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var secretekey_login = process.env.secretkey;
var forgetPassword_token = process.env.forgetPassword_token; //create new user

var newUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var HashedPassword, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcrypt["default"].hash(body.Password, 10);

          case 2:
            HashedPassword = _context.sent;
            body.Password = HashedPassword;
            _context.next = 6;
            return _user.User.create(body);

          case 6:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function newUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.newUser = newUser;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var searchData, token, isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user.User.findOne({
              Email: body.Email
            });

          case 2:
            searchData = _context2.sent;
            token = _jsonwebtoken["default"].sign({
              Email: searchData.Email,
              ID: searchData._id
            }, secretekey_login);
            _context2.next = 6;
            return _bcrypt["default"].compare(body.Password, searchData.Password);

          case 6:
            isMatch = _context2.sent;

            if (!(body.Email == searchData.Email)) {
              _context2.next = 13;
              break;
            }

            if (!isMatch) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", token);

          case 12:
            throw new Error('Invalid pasword');

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;

var addNote = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var newNote;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body.UserID = body.data.ID;
            _context3.next = 3;
            return _note.Notes.create(body);

          case 3:
            newNote = _context3.sent;
            return _context3.abrupt("return", newNote);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function addNote(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addNote = addNote;

var updateNote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var previous, updated;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _note.Notes.findOne({
              _id: body.NoteID
            });

          case 2:
            previous = _context4.sent;
            _context4.next = 5;
            return _note.Notes.updateOne({
              _id: body.NoteID
            }, {
              Title: body.Title ? body.Title : previous.Title,
              Descreption: body.Descreption ? body.Descreption : previous.Descreption,
              color: body.color ? body.color : previous.color,
              isArchived: body.isArchived ? body.isArchived : previous.isArchived,
              isDeleted: body.isDeleted ? body.isDeleted : previous.isDeleted
            }, {
              "new": true
            });

          case 5:
            updated = _context4.sent;
            return _context4.abrupt("return", updated);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateNote(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateNote = updateNote;

var getNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(body) {
    var findNote;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _note.Notes.find({
              UserID: body.data.ID,
              isDeleted: true,
              isArchived: true
            });

          case 2:
            findNote = _context5.sent;
            return _context5.abrupt("return", findNote);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getNote(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getNote = getNote;

var findtrashed = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(body) {
    var deletedNote;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _note.Notes.find({
              UserID: body.data.ID,
              isDeleted: true
            });

          case 2:
            deletedNote = _context6.sent;
            return _context6.abrupt("return", deletedNote);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function findtrashed(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.findtrashed = findtrashed;

var isArchived = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(body) {
    var archivedNotes;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _note.Notes.find({
              UserID: body.data.ID,
              isArchived: true
            });

          case 2:
            archivedNotes = _context7.sent;
            return _context7.abrupt("return", archivedNotes);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function isArchived(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

exports.isArchived = isArchived;

var forgetPassword = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
    var token, SearchMail, mail;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            token = _jsonwebtoken["default"].sign({
              Email: req.body.Email
            }, forgetPassword_token);
            _context8.next = 3;
            return _user.User.find({
              Email: req.body.Email
            });

          case 3:
            SearchMail = _context8.sent;

            if (!SearchMail) {
              _context8.next = 9;
              break;
            }

            mail = (0, _sendmail.mailSend)(SearchMail[0].Email, token);
            return _context8.abrupt("return", mail);

          case 9:
            throw Error("EMAIL ID NOT FOUND IN DATABASE!");

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function forgetPassword(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

exports.forgetPassword = forgetPassword;

var resetPassword = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req) {
    var tokenfound, isVerified, newPassword, HashednewPassword, updatePassword;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            tokenfound = req.header('Authorization').split(' ')[1];
            isVerified = _jsonwebtoken["default"].verify(tokenfound, forgetPassword_token);
            newPassword = req.body.Password;
            _context9.next = 5;
            return _bcrypt["default"].hash(newPassword, 10);

          case 5:
            HashednewPassword = _context9.sent;

            if (!isVerified) {
              _context9.next = 13;
              break;
            }

            _context9.next = 9;
            return _user.User.findOneAndUpdate({
              Email: req.body.Email
            }, {
              Password: HashednewPassword
            }, {
              "new": true
            });

          case 9:
            updatePassword = _context9.sent;
            return _context9.abrupt("return", updatePassword);

          case 13:
            throw Error;

          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function resetPassword(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;