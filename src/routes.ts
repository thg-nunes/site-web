import express from 'express'
import dataBase from './dataBase/dataBase'
import { validationResult, body } from 'express-validator'
import CryptoJS from 'crypto-js'

const routers = express.Router()

routers.get('/', (req, res) => {
  res.render('./usuario/index.ejs')
})

routers.get('/cadastro', (req, res) => {
  res.render('./usuario/cadastro.ejs')
})

interface DadosUsuario {
  id: string
  nome: string
  email: string
  senha: string
}

routers.post('/cadastro',
  body('nome', 'Nome deve ter ao menos 3 caractéries.').isLength({ min: 3 }).notEmpty(),
  body('email', 'Email inválido.').isEmail().notEmpty(),
  body('senha', 'A senha deve ter de 4 a 6 dígitos.').isLength({ min: 4, max: 6 }).notEmpty()
  , (req, res) => {
    console.log('chegou')
    const errors = validationResult(req)

    let { id, nome, email, senha }: DadosUsuario = req.body
    if (errors.array().length > 0) return res.render('./usuario/cadastro.ejs', { errors: errors })

    const senhaCriptografada = CryptoJS.MD5(senha).toString()
    senha = senhaCriptografada
    id = Math.random().toString(32).substr(2, 11)

    dataBase.query('insert into usuario id = ?, nome = ?, email = ?, senha = ?', [id, nome, email, senha], (err, result) => {
    })
  })

routers.post('/login', (req, res) => {
  dataBase.query('insert into usuarios ')
})

export default routers
