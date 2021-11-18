import { Strategy } from 'passport-google-oauth20'
import passport from 'passport'
import dotenv from 'dotenv'
dotenv.config()

const id = process.env.CLIENT_ID
const secret = process.env.CLIENT_SECRET
const redirect = process.env.REDIRECT

passport.use(new Strategy({
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

export default passport
