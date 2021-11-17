const Strategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
require('dotenv').config()

const client = process.env.CLIENT_ID
const secret = process.env.CLIENT_SECRET
const redirect = process.env.REDIRECT

passport.use(new Strategy({
  clientID: client,
  clientSecret: secret,
  callbackURL: redirect,
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  return done(null, profile)
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

module.exports = passport
