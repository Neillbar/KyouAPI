'use strict';

var express = require('express');
var config = require('../config');
var middleWare = require('../middleware');
var initializeDB = require('../db');
var Users = require('../controllers/Users');
var hospitals = require('../controllers/Hospitals');
var data = require('../controllers/data');
var complaints = require('../controllers/complaints');

var router = express();

//connect to db
initializeDB(function (db) {

    //internal middleware
    router.use(middleWare({ config: config, db: db }));

    //api routes

    router.use('/users', Users({ config: config, db: db }));
    router.use('/hospitals', hospitals({ config: config, db: db }));
    router.use('/data', data({ config: config, db: db }));
    router.use('/complaints', complaints({ config: config, db: db }));
});

module.exports = router;
//# sourceMappingURL=index.js.map