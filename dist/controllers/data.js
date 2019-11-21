'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoose = require('mongoose');

var _require = require('express'),
    Router = _require.Router;

var image2base64 = require('image-to-base64');
var attachmentSchema = require('../Schemas/attachmentsSchema');
var complaintSchema = require('../Schemas/complaintsSchema');
var fs = require('fs');

module.exports = function (_ref) {
    var config = _ref.config,
        db = _ref.db;


    var api = Router();

    api.post('/viaFilesystem', function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            var decodedFile;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            decodedFile = Buffer.from(req.body.image.indexOf('base64') !== -1 ? req.body.image.split('base64,')[1] : req.body.image, 'base64');

                            name = req.body.name;
                            fs.writeFile('./images/' + name, decodedFile, function (err, written) {
                                if (err) console.log(err);else {
                                    console.log("Successfully written");
                                }
                            });

                        case 3:
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

    api.post('/attachment', function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
            var FindComplaint, checker, newAtt, newentry, updated;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return complaintSchema.findOne({ complaintID: req.body.complaintID });

                        case 2:
                            FindComplaint = _context2.sent;

                            if (FindComplaint) {
                                _context2.next = 5;
                                break;
                            }

                            return _context2.abrupt('return', res.status(400).send("No complaints found can't add attachments"));

                        case 5:
                            _context2.next = 7;
                            return attachmentSchema.findOne({ complaintsID: req.body.complaintID });

                        case 7:
                            checker = _context2.sent;

                            if (checker) {
                                _context2.next = 20;
                                break;
                            }

                            newAtt = new attachmentSchema();

                            newAtt.complaintsID = req.body.complaintID;

                            if (req.body.type == "image") {
                                //let decodedImage = Buffer.from(req.body.image.indexOf('base64') !== -1 ? req.body.image.split('base64,')[1] : req.body.image, 'base64');
                                newAtt.image.path.push(req.body.image);
                                newAtt.image.imageID.push(req.body.imageID);
                            }

                            if (req.body.type == "recording") {

                                // let decodedRecording = Buffer.from(req.body.recording.indexOf('base64') !== -1 ? req.body.recording.split('base64,')[1] : req.body.recording, 'base64');
                                newAtt.recording = req.body.recording;
                                newAtt.recordingID = req.body.recordingID;
                            }
                            if (req.body.type == "video") {

                                //let decodedVideo = Buffer.from(req.body.video.indexOf('base64') !== -1 ? req.body.video.split('base64,')[1] : req.body.video, 'base64');
                                newAtt.video = req.body.video;
                                newAtt.videoID = req.body.videoID;
                            }

                            _context2.next = 16;
                            return newAtt.save();

                        case 16:
                            newentry = _context2.sent;

                            if (newentry) {
                                res.send(newentry);
                            }

                            _context2.next = 27;
                            break;

                        case 20:

                            if (req.body.type == "image") {
                                // let decodedImage = Buffer.from(req.body.image.indexOf('base64') !== -1 ? req.body.image.split('base64,')[1] : req.body.image, 'base64');
                                checker.image.path.push(req.body.image);
                                newAtt.image.imageID.push(req.body.imageID);
                            }

                            if (req.body.type == "recording") {

                                //let decodedRecording = Buffer.from(req.body.recording.indexOf('base64') !== -1 ? req.body.recording.split('base64,')[1] : req.body.recording, 'base64');
                                checker.recording = req.body.recording;
                                checker.recordingID = req.body.recordingID;
                            }
                            if (req.body.type == "video") {

                                // let decodedVideo = Buffer.from(req.body.video.indexOf('base64') !== -1 ? req.body.video.split('base64,')[1] : req.body.video, 'base64');
                                checker.video = req.body.video;
                                checker.videoID = req.body.videoID;
                            }

                            _context2.next = 25;
                            return checker.save();

                        case 25:
                            updated = _context2.sent;

                            if (updated) {
                                res.send(updated);
                            }

                        case 27:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x3, _x4) {
            return _ref3.apply(this, arguments);
        };
    }());

    api.get('/getByName/:complaintID', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
            var findAttachment, allData, i, items, _name, convertBase64ToString, object, _name2, VideoconvertBase64ToString, _object, _name3, RecordingconvertBase64ToString, _object2;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return attachmentSchema.find({ complaintsID: req.params.complaintID });

                        case 2:
                            findAttachment = _context3.sent;

                            if (!(findAttachment.length < 1)) {
                                _context3.next = 5;
                                break;
                            }

                            return _context3.abrupt('return', res.status(400).send("Could not find attachments"));

                        case 5:
                            allData = [];
                            i = 0;
                            //console.log(findAttachment[0].image.length);

                            if (!findAttachment[0].image) {
                                _context3.next = 19;
                                break;
                            }

                            _context3.t0 = regeneratorRuntime.keys(findAttachment[0].image);

                        case 9:
                            if ((_context3.t1 = _context3.t0()).done) {
                                _context3.next = 19;
                                break;
                            }

                            items = _context3.t1.value;
                            _name = findAttachment[0].complaintsID;
                            _context3.next = 14;
                            return findAttachment[0].image[items].toString('base64');

                        case 14:
                            convertBase64ToString = _context3.sent;
                            object = { complaintsID: _name, image: convertBase64ToString };

                            allData.push(object);
                            _context3.next = 9;
                            break;

                        case 19:
                            if (!findAttachment[0].video) {
                                _context3.next = 26;
                                break;
                            }

                            _name2 = findAttachment[0].complaintsID;
                            _context3.next = 23;
                            return findAttachment[0].video.toString('base64');

                        case 23:
                            VideoconvertBase64ToString = _context3.sent;
                            _object = { complaintsID: _name2, video: VideoconvertBase64ToString };

                            allData.push(_object);

                        case 26:
                            if (!findAttachment[0].recording) {
                                _context3.next = 33;
                                break;
                            }

                            _name3 = findAttachment[0].complaintsID;
                            _context3.next = 30;
                            return findAttachment[0].video.toString('base64');

                        case 30:
                            RecordingconvertBase64ToString = _context3.sent;
                            _object2 = { complaintsID: _name3, recording: RecordingconvertBase64ToString };

                            allData.push(_object2);

                        case 33:
                            return _context3.abrupt('return', res.send(allData));

                        case 34:
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

    return api;
};
//# sourceMappingURL=data.js.map