var mongoose = require('mongoose');
var config = require('./config');

module.exports =  callback => {

    let db = mongoose.connect(config.mongoURL);
    callback(db);

}