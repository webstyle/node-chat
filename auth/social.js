var express = require('express');
var router = express.Router();
var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
var util = require('util');

// Instagram
var INSTAGRAM_CLIENT_ID = "39654407bfc643a697820f9131cb7e74"
var INSTAGRAM_CLIENT_SECRET = "b2e8357e41f84c6f9c5e47210826c19f";
// Google
var GOOGLE_CLIENT_ID = "779718049599-ig2kdk45uvk16647otv5aclgp7k0t5mp.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "oCZw5zNwWJ-2rW1aFVDhK_DV";
// GitHub
var GITHUB_CLIENT_ID = "4ee0715566f8df3b104b";
var GITHUB_CLIENT_SECRET = "eb4d7a7ef04d4c25dfc234c1de95175286ccfda8";

// user profile
var user = null;

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the InstagramStrategy within Passport.
passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('User', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    user = profile;
    process.nextTick(function() {
      return done(null, profile);
    });
  }
));


// Google
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function() {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function() {
      console.log('Profile', profile);
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

router.get('/me', function(req, res) {
  res.json(user);
});

// GET /auth/instagram
router.get('/instagram',
  passport.authenticate('instagram'),
  function(req, res) {
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  });

// GET /auth/instagram/callback
router.get('/instagram/callback',
  passport.authenticate('instagram', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/me');
  }
);

// GET /auth/google
router.get('/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  }),
  function(req, res) {
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

// GET /auth/google/callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });

// GET /auth/github
router.get('/github',
  passport.authenticate('github', {
    scope: ['user:email']
  }),
  function(req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

// GET /auth/github/callback
router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });

// Logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

module.exports = router;
