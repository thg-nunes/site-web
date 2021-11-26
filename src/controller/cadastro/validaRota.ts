import { Request, Response } from 'express'
import { validationResult, body } from 'express-validator'
import { RowDataPacket, ResultSetHeader } from 'mysql2'
import dataBase from '../../dataBase/dataBase'
import protocolo from './protocolo'
import CryptoJS from 'crypto-js'

class ValidaRota {
  validar_campos: any
  validar_rota: any
  validar_login: any
  validarResult_login: any
  constructor () {
    this.validar_campos = this.validarCampos()
    this.validar_rota = this.validaRota
    this.validar_login = this.validarLogin()
  }

  private validarCampos (): any {
    return [
      body('nome', 'Nome deve ter ao menos 3 caractéries.').isLength({ min: 3 }),

      body('email', 'Email inválido.').isEmail(),

      body('senha', 'A senha deve ter de 4 a 6 dígitos.').isLength({ min: 4, max: 6 }),
      body('confirmacaoDeSenha', 'As senhas devem ser iguais.').custom((valorCampo, { req }) => {
        if (valorCampo !== req.body.senha) {
          throw new Error('Senhas devem ser iguais.')
        } return true
      })
    ]
  }

  private validaRota (req: Request, res: Response): void {
    const err = validationResult(req)
    const errors = err.array()
    if (errors.length > 0) return res.render('./usuario/cadastro.ejs', { err: errors })

    let { id, nome, email, senha, confirmacaoDeSenha }: protocolo = req.body
    confirmacaoDeSenha = CryptoJS.MD5(senha).toString()
    id = Math.random().toString(32).substr(2, 11)

    dataBase.query('select * from usuarios where nome = ? and email = ?', [nome, email], (err, result: RowDataPacket[]) => {
      if (!err && result.length === 0) {
        dataBase.query('insert into usuarios set id =?, nome = ?, email = ?, senha = ?', [id, nome, email, confirmacaoDeSenha], (err, result: ResultSetHeader) => {
          if (!err && result.affectedRows === 1) return (res.render('./usuario/cadastro.ejs', { err: {} }))
          if (err) return res.render('./usuario/cadastro.ejs', { erroSistema: new Error('Erro interno do sistema, volte mais tarde.'), msgInfor: '', err: {} })
        })
      }

      if (result.length > 0) return res.render('./usuario/cadastro.ejs', { msgInfor: 'Usuário já cadastrado, forneça nome e email diferente', err: {}, erroSistema: {} })
      if (err) return res.render('./usuario/cadastro.ejs', { erroSistema: new Error('Erro interno do sistema, volte mais tarde.'), msgInfor: '', err: {} })
    })
  }

  private validarLogin (): any {
    return [
      body('email', 'Email inválido.').isEmail(),
      body('senha', 'A senha deve ter de 4 a 6 dígitos.').isLength({ min: 4, max: 6 })
    ]
  }
}

export default new ValidaRota()
