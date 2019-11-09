'use strict';

var mongoose = require('mongoose');
var config = require('./config');

module.exports = function (callback) {

    var db = mongoose.connect(config.mongoURL, { useNewUrlParser: true });
    callback(db);
};
//# sourceMappingURL=db.js.map