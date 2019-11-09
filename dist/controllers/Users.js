'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoose = require('mongoose');

var _require = require('express'),
    Router = _require.Router;

var newUser = require('../Schemas/UsersSchema');
var md5 = require('md5');

module.exports = function (_ref) {
  var config = _ref.config,
      db = _ref.db;


  var api = Router();

  api.post('/register', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var password, newuser, findUser, savedUser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              password = md5(req.body.password);
              newuser = new newUser();

              newuser.name = req.body.name;
              newuser.phoneNumber = req.body.phoneNumber;
              newuser.language = req.body.language;
              newuser.idNumber = req.body.idNumber;
              newuser.email = req.body.email;
              newuser.password = password;

              findUser = newUser.find({ idNumber: req.body.idNumber });

              console.log(findUser);

              if (!findUser) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', res.status(400).send("user already exists"));

            case 12:
              _context.next = 14;
              return newuser.save();

            case 14:
              savedUser = _context.sent;


              res.send(savedUser);

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  return api;
}; //exporting
//# sourceMappingURL=Users.js.map