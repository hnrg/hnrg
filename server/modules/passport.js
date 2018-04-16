const passport = require('passport'),
      User = require('../models/user'),
      secret = require('../config/secret'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');


const localOptions = {
  usernameField: 'email', // Setting username field to email rather than username
  passwordField: 'password',
}


const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if(err) {
      return done(err);
    }

    if(!user) {
      return done(null, false, { error: 'No user exists with that email address' });
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false, { error: "Invalid password" });
      }

      return done(null, user);
    });
  });
});


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),   // Telling Passport to check authorization headers for JWT
  secretOrKey: secret.secret   // Telling Passport where to find the secret
};


const jwtLogin = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  User.findById(jwt_payload.user, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
