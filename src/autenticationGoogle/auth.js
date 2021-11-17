const AuthGoogle = require('passport-google-oauth20').Strategy
const passport = require('passport')

const id = process.env.CLIENT_ID
const secret = process.env.CLIENT_SECRET
const redirect = process.env.CALLBACK_URL

passport.use(new AuthGoogle({
  clientID: id,
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
