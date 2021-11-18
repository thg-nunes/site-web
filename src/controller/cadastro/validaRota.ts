import { Request, Response } from 'express'
import { validationResult, body } from 'express-validator'
import { RowDataPacket } from 'mysql2'
import dataBase from '../../dataBase/dataBase'
import protocolo from './protocolo'

class ValidaRota {
  validar_campos: any
  validar_rota: any
  constructor () {
    this.validar_campos = this.validarCampos()
    this.validar_rota = this.validaRota
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
        dataBase.query('insert into usuarios set id =?, nome = ?, email = ?, senha = ?', [id, nome, email, confirmacaoDeSenha], (err, result: RowDataPacket[]) => {
          if (!err && result.length > 0) return console.log('usuario cadastrado', result)
          throw new Error('Erro interno do sistema, volte mais tarde.')
        })
      }
      if (result.length > 0) {
        console.log('usuario ja cadastrado, forneça nome e email diferente')
      }
      if (err) throw new Error('erro no sistema, volte mais tarde')
    })
  }
}

export default new ValidaRota()
