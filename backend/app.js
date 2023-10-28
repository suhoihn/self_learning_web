// Require all essential modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


// Additional modules
var cors = require('cors');
const db = require('./db/db.js'); // DB connection
const dataRouter = require('./routes/data'); // Router


// Create the app (backend)
const app = express();


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// Connect to DB
db();


// Use the router from routes/data.js
// The backend is accessed through address [PORT]://api/Data/[Address]
app.use('/api/Data', dataRouter);


// Default error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
