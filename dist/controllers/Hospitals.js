'use strict';

var addNewHospital = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var checkHosp, savedHosp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        //add new hospital 

                        newHosp = new newhospSchema();
                        newHosp.name = req.body.name;
                        newHosp.latitude = req.body.latitude;
                        newHosp.longitude = req.body.longitude;
                        newHosp.description = req.body.description;

                        _context.next = 7;
                        return newhospSchema.findOne({ name: req.body.name });

                    case 7:
                        checkHosp = _context.sent;

                        if (!checkHosp) {
                            _context.next = 10;
                            break;
                        }

                        return _context.abrupt('return', res.status(400).send("Hospital is already on the list"));

                    case 10:
                        _context.next = 12;
                        return newHosp.save();

                    case 12:
                        savedHosp = _context.sent;


                        res.status(200).send(savedHosp);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function addNewHospital(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}(); //addNewHospital

var getOneHospital = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var hospitalID, findHosp;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        hospitalID = req.params.id;
                        _context2.next = 3;
                        return newhospSchema.findOne({ _id: hospitalID });

                    case 3:
                        findHosp = _context2.sent;

                        if (findHosp) {
                            _context2.next = 6;
                            break;
                        }

                        return _context2.abrupt('return', res.status(400).send("No hospital Found"));

                    case 6:

                        res.status(200).send(findHosp);

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getOneHospital(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}(); //getOneHospital


var getAllHospitals = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var findHosp;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return newhospSchema.find({});

                    case 2:
                        findHosp = _context3.sent;

                        if (!(findHosp.length < 1)) {
                            _context3.next = 5;
                            break;
                        }

                        return _context3.abrupt('return', res.status(400).send("No hospital Found"));

                    case 5:

                        res.status(200).send(findHosp);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function getAllHospitals(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoose = require('mongoose');

var _require = require('express'),
    Router = _require.Router;

newhospSchema = require('../Schemas/hospitalSchema');

module.exports = function (_ref4) {
    var config = _ref4.config,
        db = _ref4.db;


    var api = Router();

    api.post('/new', function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:

                            addNewHospital(req, res);

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

    api.get('/getone/:id', function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:

                            getOneHospital(req, res);

                        case 1:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        }));

        return function (_x9, _x10) {
            return _ref6.apply(this, arguments);
        };
    }());

    api.get('/getall', function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:

                            getAllHospitals(req, res);

                        case 1:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        }));

        return function (_x11, _x12) {
            return _ref7.apply(this, arguments);
        };
    }());

    return api;
}; //exporting
//# sourceMappingURL=Hospitals.js.map