'use strict';

//var attachments = require('../Schemas/attachmentsSchema');


var addComplaint = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var findUser, randomID, newComplaint, savedComplaint, SaveComplaintToUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return users.findOne({ idNumber: req.body.loggedBy });

                    case 2:
                        findUser = _context.sent;
                        randomID = uniqid();
                        newComplaint = new complaintScheme();

                        newComplaint.complaintID = randomID;
                        newComplaint.loggedBy = req.body.loggedBy;
                        newComplaint.hospID = req.body.hospID;
                        newComplaint.type = req.body.type;
                        newComplaint.complaintText = req.body.complaintText;
                        newComplaint.progress = req.body.progress;
                        findUser.complaints.push(randomID);
                        newComplaint.attachments = req.body.attachments;
                        _context.next = 15;
                        return newComplaint.save();

                    case 15:
                        savedComplaint = _context.sent;
                        _context.next = 18;
                        return findUser.save();

                    case 18:
                        SaveComplaintToUser = _context.sent;

                        if (!(savedComplaint && SaveComplaintToUser)) {
                            _context.next = 23;
                            break;
                        }

                        return _context.abrupt('return', res.status(200).json({ message: "Success", ComplaintID: randomID }));

                    case 23:
                        return _context.abrupt('return', res.status(400).send({ message: "Failure Saving Data" }));

                    case 24:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function addComplaint(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var getComplaintByID = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var findSpeseficComplaint;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return complaintScheme.findOne({ complaintID: req.params.compid });

                    case 2:
                        findSpeseficComplaint = _context2.sent;

                        if (findSpeseficComplaint) {
                            _context2.next = 5;
                            break;
                        }

                        return _context2.abrupt('return', res.status(400).send("No Complaint found"));

                    case 5:

                        res.status(200).json(findSpeseficComplaint);

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getComplaintByID(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var getallComplaintsForUser = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var findComplaints;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        userID = req.params.userID;

                        _context3.next = 3;
                        return complaintScheme.find({ loggedBy: userID });

                    case 3:
                        findComplaints = _context3.sent;

                        if (!(findComplaints.length < 1)) {
                            _context3.next = 6;
                            break;
                        }

                        return _context3.abrupt('return', res.status(400).send("No complaints found for this user"));

                    case 6:

                        res.status(200).json(findComplaints);

                    case 7:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function getallComplaintsForUser(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoose = require('mongoose');

var _require = require('express'),
    Router = _require.Router;

var complaintScheme = require('../Schemas/complaintsSchema');
var users = require('../Schemas/UsersSchema');
var uniqid = require('uniqid');

module.exports = function (_ref4) {
    var config = _ref4.config,
        db = _ref4.db;


    var api = Router();

    api.post('/add', function (req, res) {
        addComplaint(req, res);
    });

    api.get('/getOneByID/:compid', function (req, res) {
        getComplaintByID(req, res);
    });

    api.get('/getAllComplaintsPerUser/:userID', function (req, res) {

        getallComplaintsForUser(req, res);
    });

    return api;
};
//# sourceMappingURL=complaints.js.map