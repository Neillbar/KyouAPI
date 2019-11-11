'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoose = require('mongoose');

var _require = require('express'),
    Router = _require.Router;

var image2base64 = require('image-to-base64');
var attachmentSchema = require('../Schemas/attachmentsSchema');
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
            var decodedFile, checker, newAtt, newentry, updated;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            //take base64 to Buffer
                            decodedFile = Buffer.from(req.body.image.indexOf('base64') !== -1 ? req.body.image.split('base64,')[1] : req.body.image, 'base64');
                            _context2.next = 3;
                            return attachmentSchema.findOne({ name: req.body.name });

                        case 3:
                            checker = _context2.sent;

                            if (checker) {
                                _context2.next = 14;
                                break;
                            }

                            newAtt = new attachmentSchema();

                            newAtt.name = req.body.name;
                            newAtt.image.push(decodedFile);
                            _context2.next = 10;
                            return newAtt.save();

                        case 10:
                            newentry = _context2.sent;

                            if (newentry) {
                                res.send(newentry);
                            }

                            _context2.next = 19;
                            break;

                        case 14:

                            checker.image.push(decodedFile);

                            _context2.next = 17;
                            return checker.save();

                        case 17:
                            updated = _context2.sent;

                            if (updated) {
                                res.send(updated);
                            }

                        case 19:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x3, _x4) {
            return _ref3.apply(this, arguments);
        };
    }()

    //take Buffer back to base64

    //let text = decodedFile.toString('base64')

    //let subStr = req.body.image.indexOf('data/')
    // let newSubstr = req.body.image.indexOf('base64')
    // let tell = req.body.image;
    // let imageType = tell.substring(subStr+6, newSubstr)

    // console.log(subStr);
    // console.log(tell);
    // console.log(tell);
    // console.log(imageType);


    //take base64 to a file! 
    // fs.writeFile('test.png', decodedFile, function(err,written){
    //     if(err) console.log(err);
    //      else {
    //       console.log("Successfully written");
    //      }
    //  });

    // take file back to base64
    //let file = image2base64('./test.png');

    //console.log(await file);

    );

    api.get('/getByName/:name', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
            var findAttachment, allData, i, items, _name, convertBase64ToString, object;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return attachmentSchema.find({ name: req.params.name });

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

                            _context3.t0 = regeneratorRuntime.keys(findAttachment[0].image);

                        case 8:
                            if ((_context3.t1 = _context3.t0()).done) {
                                _context3.next = 18;
                                break;
                            }

                            items = _context3.t1.value;
                            _name = findAttachment[0].name;
                            _context3.next = 13;
                            return findAttachment[0].image[items].toString('base64');

                        case 13:
                            convertBase64ToString = _context3.sent;
                            object = { name: _name, image: convertBase64ToString };

                            allData.push(object);
                            _context3.next = 8;
                            break;

                        case 18:
                            return _context3.abrupt('return', res.send(allData));

                        case 19:
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