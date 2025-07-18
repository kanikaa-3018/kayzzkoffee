
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const flash = require('connect-flash');
const passport = require('passport');
const createError = require('http-errors');
const localStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const userModel = require('./models/user-model');
const orderModel = require('./models/order-model');
const coffeeModel = require('./models/coffee-model');

require("dotenv").config();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const quizRouter = require('./routes/quiz');
const recipeRouter= require('./routes/recipe');
const orderRouter = require('./routes/order');

var app = express();
var db = require("./config/db-connect");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// app.use(
//   expressSession({
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//     secret: process.env.EXPRESS_SESSION_SECRET,
//   })
// );

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // set true in production with HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id);  // Store user ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);  // Find user by ID and return it
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Set up flash middleware
app.use(flash());

// Middleware to make flash messages available to all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});





app.use('/', indexRouter);
app.use('/quiz', quizRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipeRouter);
app.use('/order', orderRouter);

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
