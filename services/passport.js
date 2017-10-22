const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback',
    proxy: true
  },
  async (token, tokenSecret, profile, done) => {
    console.log(profile);
    const existingUser = await User.findOne({ twitterId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({ twitterId: profile.id, twitterName: profile.username }).save();
    return done(null, user);
  }
));
