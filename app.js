/*=============================================
=              James Resume App               =
=============================================*/

/*========== The tools for the job ==========*/

var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    MongoStore = require('connect-mongo')(express);


/**
 * Compiles stylus file and imports nib to it
 */
function compile(str, path) {
  return stylus(str).set('filename', path).set('compress', true).use(nib()).import('nib');
}

var app = express();

var port = process.env.PORT || 4000;

/* MongoDB Configuration file */
var configDB = require('./config/database.js');

/* Connect to super awesome MongoDB*/
mongoose.connect(configDB.url);

/* Passport configuration */
require('./config/passport')(passport);

/*==========  The App configurations  ==========*/

app.configure(function() {

  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.bodyParser());

  // app.set('view engine', 'jade');

  app.use(stylus.middleware( { src: __dirname + '/public', compile: compile }));
  app.use(express.static(__dirname + '/public'));

  // TODO: Change Secret token to something real.
  app.use(express.session({ 
    store: new MongoStore({
      url: configDB.url
    }),
    secret: 'j092qujifkol,afelJ@#4i9tohakldf,mshi23or8iasdf' 
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
});

/* Get all app routes */
// TODO: Have multiple route files, this might get messy
require('./app/routes.js')(app, passport);

/**
 * App listens on declared port
 */
app.listen(port, function() {
  console.log('Server has started on port: ' + port);
});