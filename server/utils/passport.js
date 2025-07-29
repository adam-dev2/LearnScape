const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id); 
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(new GoogleStrategy({
    clientID: '1052138660295-6m43ttvjdv8enhh62rjc3dt4eg1qbo07.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0].value
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));
};
