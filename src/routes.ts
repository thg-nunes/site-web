import express from 'express'
import validaRota from './controller/cadastro/validaRota'

const routers = express.Router()

routers.get('/', (req, res) => {
  res.render('./usuario/index.ejs')
})

routers.get('/cadastro', (req, res) => {
  res.render('./usuario/cadastro.ejs', { err: {} })
})

routers.post('/cadastro', validaRota.validar_campos, (req, res) => {
  validaRota.validar_rota(req, res)
})

// routers.post('/login', (req, res) => {
//   dataBase.query('insert into usuarios ')
// })

export default routers
