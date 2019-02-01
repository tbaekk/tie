const createError    = require('http-errors');
const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const path           = require('path');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const flash          = require('connect-flash');
const session        = require('express-session');
const passport       = require('passport');
const logger         = require('morgan');
const mongoose       = require('mongoose');

const app = express();

// passport config
require('./config/passport')(passport);

// configure mongoose
mongoose
  .connect(
    'mongodb://localhost/local',
    { useNewUrlParser: true }
  )
  .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
  secret: 'secret',
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
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/dashboard', require('./routes/dashboard'));

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