'use strict';

var registerUserFunction = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
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

                        _context.next = 10;
                        return newUser.find({ idNumber: req.body.idNumber });

                    case 10:
                        findUser = _context.sent;

                        console.log(findUser);

                        if (!(findUser.length > 0)) {
                            _context.next = 14;
                            break;
                        }

                        return _context.abrupt('return', res.status(400).send("user already exists"));

                    case 14:
                        _context.next = 16;
                        return newuser.save();

                    case 16:
                        savedUser = _context.sent;


                        res.send(savedUser);

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function registerUserFunction(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}(); //registerUserFunction

var LoginUser = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var User;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return newUser.findOne({ idNumber: req.body.idNumber });

                    case 2:
                        User = _context2.sent;

                        if (User) {
                            _context2.next = 5;
                            break;
                        }

                        return _context2.abrupt('return', res.status(400).send("user does not exist"));

                    case 5:
                        if (!(User.email !== req.body.email)) {
                            _context2.next = 7;
                            break;
                        }

                        return _context2.abrupt('return', res.status(400).send("Email does not exists in the database"));

                    case 7:
                        if (!(User.password !== md5(req.body.password))) {
                            _context2.next = 9;
                            break;
                        }

                        return _context2.abrupt('return', res.status(400).send("Password is incorrect"));

                    case 9:

                        res.send(User);

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function LoginUser(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}(); //LoginUser

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoose = require('mongoose');

var _require = require('express'),
    Router = _require.Router;

var newUser = require('../Schemas/UsersSchema');
var md5 = require('md5');

module.exports = function (_ref3) {
    var config = _ref3.config,
        db = _ref3.db;


    var api = Router();

    api.post('/register', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            registerUserFunction(req, res);

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function (_x5, _x6) {
            return _ref4.apply(this, arguments);
        };
    }());

    api.post('/login', function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:

                            LoginUser(req, res);

                        case 1:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function (_x7, _x8) {
            return _ref5.apply(this, arguments);
        };
    }());

    return api;
}; //exporting
//# sourceMappingURL=Users.js.map