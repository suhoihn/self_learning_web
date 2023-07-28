const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dataRouter = require('./routes/data');
// const usersRouter = require('./routes/users');

const app = express();
var cors = require('cors')

const db = require('./db/db.js'); // db 불러오기
// const usersRouter = require('./db/api/User');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()) // cool now everything is handled!

app.use('/api/Data', dataRouter);
// app.use('/users', usersRouter);
// app.use('/example', usersRouter);

db(); // db 실행

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
