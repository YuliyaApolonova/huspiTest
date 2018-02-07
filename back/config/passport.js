const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const user = mongoose.model('User');

passport.use(new LocalStrategy(

    function(username, password, done) {
        user.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            // Return if user not found in database
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // If credentials are correct, return the user object
            return done(null, user);
        });
    }
));

passport.use(new FacebookStrategy({
         clientID: 227436984466273,
         clientSecret: 0b45ddae42aa0ec9f4d16764ca7bef49,
         callbackURL: "http://localhost:1337/loginWithFacebook"
      },
      function(accessToken, refreshToken, profile, cb) {
         User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
         });
      }
));

// passport.use(new GoogleStrategy({
//          consumerKey: 'www.example.com',
//          consumerSecret: GOOGLE_CONSUMER_SECRET,
//          callbackURL: "http://localhost/loginWithGoogle"
//       },
//       function(token, tokenSecret, profile, cb) {
//          User.findOrCreate({ googleId: profile.id }, function (err, user) {
//             return cb(err, user);
//          });
//       }
// ));
