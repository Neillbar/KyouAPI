var express = require('express');
var config = require('../config');
var middleWare = require('../middleware');
var initializeDB = require('../db');



let router = express();

//connect to db
initializeDB(db =>{

    //internal middleware
router.use(middleWare({config,db}));

    //api routes



});

module.exports = router;