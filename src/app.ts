import express from 'express'
import path from 'path'
import routers from './routes'

class App {
  public express: express.Application

  constructor () {
    this.express = express()
    this.midlewares()
    this.routers()
  }

  private midlewares (): void {
    this.express.use(express.json())

    this.express.use(express.static(path.join(__dirname, './public')))

    this.express.set('views engine', 'ejs')
    this.express.set('views', path.join(__dirname, './views'))
  }

  private routers (): void {
    this.express.use(routers)
  }
}

export default new App().express
