import express from 'express'
import validaRota from './controller/cadastro/validaRota'
import CryptoJS from 'crypto-js'
import dataBase from './dataBase/dataBase'
import { sign } from 'jsonwebtoken'

const routers = express.Router()

routers.get('/', (req, res) => {
  res.render('./usuario/login.ejs')
})

routers.get('/cadastro', (req, res) => {
  res.render('./usuario/cadastro.ejs', { err: {}, msgInfor: '', erroSistema: {} })
})

routers.post('/cadastro', validaRota.validar_campos, (req, res) => {
  validaRota.validar_rota(req, res)
})

interface DadosLogin {
  email?: string
  senha?: string
  id?: string
}

routers.post('/login', (req, res) => {
  const { email, senha }: DadosLogin = req.body
  const senhaCriptografada: string = CryptoJS.MD5(senha).toString()

  dataBase.query('select * from usuarios where email = ? and senha = ?', [email, senhaCriptografada], (err, result) => {
    if (!err && result) {
      const { id }: DadosLogin = result[0]
      const token = sign(id, process.env.SECRET_JWT)
      res.header('token', token)
      res.redirect('/home')
    }
    res.status(500).send()
  })
})

routers.get('/home', (req, res) => {
  console.log(req.user)
})

export default routers
