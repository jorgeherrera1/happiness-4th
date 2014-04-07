'use strict';

// Module dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport');

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables
var config = require('./server/config/config');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Create Express app
var app = express();

// Passport settings
require('./server/config/passport')(passport);

// Express settings
require('./server/config/express')(app, passport);

// Start the app by listening on <port>
app.listen(config.port);

console.log('4th Happiness started on port ' + config.port);

// Expose app
exports = module.exports = app;

