'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

require('./authenticate');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// server.js
var path = require('path');
//var passport = require('./authenticate');

var cookieParser = require('cookie-parser');

var app = (0, _express2.default)();

var apiRoutes = require("./src/api-routes/api-routes");
var userapi = require("./src/api-routes/user-routes");
var hubapi = require("./src/api-routes/hub-routes");
var orgazizationapi = require("./src/api-routes/organization-routes");
var authApi = require("./src/api-routes/auth-routes");
var vehicleApi = require("./src/api-routes/vehicle-routes");
var chargerApi = require("./src/api-routes/chargersocket-routes");

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/IoT';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
_mongoose2.default.connect(uristring, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

// Require static assets from public folder
app.use(_express2.default.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);

app.use(_bodyParser2.default.urlencoded({
  extended: true
}));

app.use(_bodyParser2.default.json());
app.use(cookieParser());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Connect to Mongoose and set connection variable

// Send message for default URL
app.get('/', function (req, res) {
  return res.send('Hello World with Express');
});
// Use Api routes in the App

app.use('/api', apiRoutes);
app.use('/authApi', authApi);
app.use('/userapi', userapi);
app.use('/hubapi', hubapi);
app.use('/orgazizationapi', orgazizationapi);
app.use('/vehicleApi', vehicleApi);
app.use('/chargerApi', chargerApi);

app.listen(8080);
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});