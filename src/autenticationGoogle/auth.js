const AuthGoogle = require('passport-google-oauth20').Strategy
const passport = require('passport')

passport.use(new AuthGoogle({
  clientID: '?',
  clientSecret: '?',
  callbackURL: '?',
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
