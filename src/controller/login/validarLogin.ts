import CryptoJS from 'crypto-js'
import dataBase from '../../dataBase/dataBase'
import { sign } from 'jsonwebtoken'
import { validationResult } from 'express-validator'

interface DadosLogin {
  email?: string
  senha?: string
  id?: string
  nome?: string
}

class ValidarLogin {
  validar_login: any
  constructor () {
    this.validar_login = this.validarLogin
  }

  private validarLogin (req, res): void {
    const errors = validationResult(req).array()
    if (errors.length > 0) return res.render('./usuario/login.ejs', { err: errors })

    const { email, senha }: DadosLogin = req.body
    const senhaCriptografada: string = CryptoJS.MD5(senha).toString()

    dataBase.query('select * from usuarios where email = ? and senha = ?', [email, senhaCriptografada], (err, result) => {
      if (!err && result !== undefined) {
        const { id }: DadosLogin = result[0]
        const token = (): string => { return sign({ id }, process.env.SECRET_JWT) }
        const valueToken = token()

        req.session.cookie.path = valueToken
        return res.redirect('/home')
      }
      return res.status(500).send()
    })
  }
}

export default new ValidarLogin()
