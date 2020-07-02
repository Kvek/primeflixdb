var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var getConfig = require('./routes/config');

var getMovies = require('./routes/movie');
var getPopular = require('./routes/popular');
var getTrending = require('./routes/trending');
var getNowPlaying = require('./routes/now-playing');
var getVideo = require('./routes/get-video');
var getCertification = require('./routes/certification');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/config', getConfig);
app.use('/movies', getMovies);
app.use('/popular', getPopular);
app.use('/trending', getTrending);
app.use('/now_playing', getNowPlaying);
app.use('/video', getVideo);
app.use('/certification', getCertification);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
