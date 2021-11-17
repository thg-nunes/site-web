const express = require('express').Router()
const passport = require('passport')
require('./auth')

express.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

express.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/home', failureRedirect: '/' }
))

express.get('/home', (req, res) => {
  const session = req.session
  const { id } = session
  req.params = id

  res.render('./usuario/home.ejs')
})

module.exports = express
