import express from 'express'
import passport from 'passport'
import './auth'
const router = express.Router()

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/home', failureRedirect: '/' }
))

interface DadosUsuario {
  id?: string
  name?: {
    givenName: string
  }
  photos?: [{ value: string }]
}

router.get('/home', (req, res) => {
  const obj: DadosUsuario = req.user
  const { id, name, photos } = obj
  // console.log(id, name.givenName, photos[0].value)
  res.render('./usuario/home.ejs', { nomeUsuario: name.givenName, imgPerfil: photos[0].value })
})

export default router

// module.exports = express
// const express = require('express')
// const session = require('express-session')
// const app = express()
// const passport = require('passport')
// require('./auth')

// app.use(session({ secret: 't423h5a213g7898i04s' }))
// app.use(passport.initialize())
// app.use(passport.session())

// app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

// app.get('/auth/google/callback', passport.authenticate('google', {
//   successRedirect: '/home',
//   failureRedirect: '/'
// }))

// function verifyResponse (req, res, next) {
//   req.user.id ? next() : res.status(401).send()
// }

// app.get('/home', verifyResponse, (req, res) => {
//   console.log(req.user)
//   res.send('foi-se')
// })

// module.exports = app
