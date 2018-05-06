const passport = require('passport');
const User = require('../models/user');
const secret = require('../config/secret');
const { Strategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const localOptions = {
  usernameField: 'email', // Setting username field to email rather than username
  passwordField: 'password',
};

const localLogin = new LocalStrategy(localOptions, ((email, password, done) => {
  User.findOne({ email, active: true }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { error: 'No user exists with that email address' });
    }

    user.comparePassword(password, (error, isMatch) => {
      if (error) {
        return done(error);
      }

      if (!isMatch) {
        return done(null, false, { error: 'Invalid password' });
      }

      return done(null, user);
    });
  });
}));


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'), // Telling Passport to check authorization headers for JWT
  secretOrKey: secret.secret, // Telling Passport where to find the secret
};


const jwtLogin = new Strategy(jwtOptions, ((jwtPayload, done) => {
  User.findOne({ _id: jwtPayload.user, active: true }).populate({
    path: 'roles',
    select: 'name permissions',
    populate: {
      path: 'permissions',
      select: 'name',
    },
  }).exec((err, user) => {
    if (err) {
      return done(err, false);
    }

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  });
}));

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;
