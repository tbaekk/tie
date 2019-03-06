const path = require('path');
const flash = require('connect-flash');
const logger = require('morgan');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload'); // may dont need this

const indexRouter = require('./server/routes/index'),
      usersRouter = require('./server/routes/users'),
      dashboardRouter = require('./server/routes/dashboard'),
      gamesRouter = require('./server/routes/games');

const app = express();

// passport config
require('./server/config/passport')(passport);

// dotenv config
require('dotenv').config();

// configure mongoose
mongoose
  .connect(process.env.DB_URI,{ useNewUrlParser: true })
  .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(fileUpload({
//   useTempFiles : true,
//   tempFileDir : '/tmp/'
// }));

// express session
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  rolling: true,
  resave: true,
  saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global vars
app.use((req,res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.login = req.isAuthenticated();
  next();
});

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/game', gamesRouter);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;