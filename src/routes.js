import { Router } from 'express'

const routers = Router()

routers.get('/', (req, res) => {
  res.render('index.ejs')
})

export default routers
