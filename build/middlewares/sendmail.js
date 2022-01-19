"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailSend = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

_dotenv["default"].config("./.env");

var password = process.env.EMAIL_PASS;
var EMAIL_ID = process.env.EMAIL_ID_AUTH;

var mailSend = function mailSend(mail_ID, token) {
  var transport = _nodemailer["default"].createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_ID,
      pass: password
    }
  });

  var mailOption = {
    from: EMAIL_ID,
    to: mail_ID,
    subject: "BridgeLabz:Pasword Reset",
    text: "Hello world?",
    html: "<h2 style=\"color:#9a3fda\">Hello Sir,Please Reset your password by below link!</h2><h3>Varification Link : <span style=\"color:#9a3fda\"><a href=\"http://localhost:5000/".concat(token, "\">click here</a></h3>")
  };
  return new Promise(function (resolve, reject) {
    transport.sendMail(mailOption, function (err, result) {
      if (err) {
        return reject(err);
      }

      return resolve({
        result: result,
        token: token
      });
    });
  });
};

exports.mailSend = mailSend;