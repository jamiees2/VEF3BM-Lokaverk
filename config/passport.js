/*==============================================
=            Passport Configuration            =
==============================================*/

/* Load local strategy */
var LocalStrategy = require('passport-local').Strategy;

/* Load user model */
var User = require('../app/models/user');

/* Export this to the app */
module.exports = function(passport) {

  /*==============================================
  =            Passport Session Setup            =
  ==============================================*/

  /* Serialize User for sessions */
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  /* Deserialize User */
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  /*========================================
  =            Sign Up Strategy            =
  ========================================*/

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    // Async
        console.log('quest?');
    process.nextTick(function() {
      User.findOne({ 'local.email': email }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          /* If email is already taken */
          return done(null, false, req.flash('signupMessage', 'That email is already in use'));
        } else {

          /* Create User */
          var newUser = new User();

          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          /* Save User */
          newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  /*=======================================
  =            Log In Strategy            =
  =======================================*/

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email': email }, function(err, user) {
      if (err) {
        return done(err);
      }

      // If user is not found
      if (!user) {
        return done(null, false, req.flash('loginMessage', "Wrong email or password"));
      }

      // If password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', "Wrong email or password"));
      }

      return done(null, user);
    });
  }));
};