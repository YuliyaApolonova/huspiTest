/**
 * Created by user on 20.07.17.
 */
const express = require('express');
const app = express();
const expressSession = require('express-session');

const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const path = require('path');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const login = require('./routes/login');

const User = require('./models/user');

var port = process.env.port || 1337;

app.use(expressSession({secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false}));

//
// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));
//
// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//
// const dbConfig = require('./db.js');
// mongoose.connect(dbConfig.url);

app.use(login);

app.listen(port);
console.log('App running on port ' + port);


module.exports = app;
