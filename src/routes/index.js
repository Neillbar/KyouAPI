var express = require('express');
var config = require('../config');
var middleWare = require('../middleware');
var initializeDB = require('../db');
var Users = require('../controllers/Users');
var hospitals = require('../controllers/Hospitals');
var data = require('../controllers/data');


let router = express();

//connect to db
initializeDB(db =>{

    //internal middleware
router.use(middleWare({config,db}));

    //api routes

    router.use('/users',Users({config,db}));
    router.use('/hospitals',hospitals({config,db}));
    router.use('/data',data({config,db}));

});

module.exports = router;