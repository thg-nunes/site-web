const express = require('express')
const app = express.Router()
const passport = require('passport')
require('./auth')

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

module.exports = app
