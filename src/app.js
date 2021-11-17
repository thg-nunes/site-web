const express = require('express')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const autentication = require('./autenticationGoogle/autentication')
const routers = require('./routes')
const app = express()

app.use(express.json())
app.use(session({ secret: 'Th46uN7ui', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(routers)
app.use(autentication)

app.use(express.static(path.join(__dirname, './public')))

app.set('views engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

module.exports = app
