import { Router } from 'express'

const routers = Router()

routers.get('/', (req, res) => {
  res.render('./usuario/index.ejs')
})

export default routers
