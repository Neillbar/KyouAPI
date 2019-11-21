var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var routes = require('./routes');


let app = express();
app.server = http.createServer(app);

//middleWare

//passport config
app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}));

//api route /api
app.use('/api',routes);

app.server.listen(config.port);
console.log(`Started server on port ${app.server.address().port}`);

module.exports = app;