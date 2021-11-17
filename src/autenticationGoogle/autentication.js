const express = require('express')
const session = require('express-session')
const app = express()
const passport = require('passport')
require('./auth')

app.use(session({ secret: 't423h5a213g7898i04s' }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/'
}))

function verifyResponse (req, res, next) {
  req.user.id ? next() : res.status(401).send()
}

app.get('/home', verifyResponse, (req, res) => {
  console.log(req.user)
  res.send('foi-se')
})

module.exports = app
