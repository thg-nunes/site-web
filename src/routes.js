import express from 'express'
const routers = express.Router()

routers.get('/', (req, res) => {
  res.render('./usuario/index.ejs')
})

export default routers
