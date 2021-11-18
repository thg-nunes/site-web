import express from 'express'
import passport from 'passport'
import { DadosUsuario } from './protocolos/dadosUsuario'
import './auth'
const router = express.Router()

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/home', failureRedirect: '/' }
))

router.get('/home', (req, res) => {
  const obj: DadosUsuario = req.user
  const { name, photos } = obj
  res.render('./usuario/home.ejs', { nomeUsuario: name.givenName, imgPerfil: photos[0].value })
})

export default router

// console.log(Math.random().toString(32).substr(2, 32))
