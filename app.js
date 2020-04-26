var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ageRouter = require('./routes/age');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/health-self-report', function(req, res) {
  const zipcode = req.body.Zipcode
  const age = req.body.Age
  const gender = req.body.Gender
  const confirmed = req.body.Confirmed
  const temperature = req.body.Temperature
  const vomiting = req.body.Vomiting
  const coughing = req.body.Coughing
  var FileIdContent={ Zipcode: zipcode, Age: age, Gender: gender, Confirmed: confirmed, Temperature: temperature, Vomiting: vomiting, Coughing: coughing };
  res.json(FileIdContent);
  res.end()
});

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
