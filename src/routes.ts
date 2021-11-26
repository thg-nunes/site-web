import express from 'express'
import validaRota from './controller/cadastro/validaRota'
import validarLogin from './controller/login/validarLogin'

const routers = express.Router()

routers.get('/', (req, res) => {
  res.render('./usuario/login.ejs', { err: {} })
})

routers.get('/cadastro', (req, res) => {
  res.render('./usuario/cadastro.ejs', { err: {}, msgInfor: '', erroSistema: {} })
})

routers.post('/cadastro', validaRota.validar_campos, (req, res) => {
  validaRota.validar_rota(req, res)
})

routers.get('/login', (req, res) => {
  res.render('./usuario/login.ejs', { err: {} })
})

routers.post('/login', validaRota.validar_login, (req, res) => {
  validarLogin.validar_login(req, res)
})

routers.get('/home', (req, res) => {
  if (!req.session.cookie.path) return res.status(401).send()
  return res.render('./usuario/home.ejs', { nomeUsuario: '', imgPerfil: '' })
})

export default routers
