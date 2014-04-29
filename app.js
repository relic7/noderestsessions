// var express = require('express');
// var path = require('path');
var express = require('express')
    , routes = require('./routes')
    , users = require('./routes/users')
    , images = require('./routes/images')
    , common = require('./routes/common')
    , fs = require('fs')
    , http = require('http')
    , util = require('util')
    , path = require('path');

var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// New Code Tells what db to use and where to access it
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/images');


////////////////////////////////////////////////////////
/////  Everything needs to now be accseable to the router before the app.use 
////////////////////////////////////////////////////////

// Connextions to db need to go above this routing info
var routes = require('./routes/index');
var users = require('./routes/users');
var images = require('./routes/images');

// Instansiate Express
var app = express();

// view  Jade engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser({ keepExtensions: true, uploadDir: './public/images' }));


// Make our db accessible to our router must come before next block for routing
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Db must now accessible
// Url conf like routing of urls
app.use('/', routes);
app.use('/users', users);
app.use('/images', images)
//////////////////////////////////////////////////////////////////////////////
//////////////  Database Connection Open ////////////////////////////////////


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
