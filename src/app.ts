import express from 'express'
import path from 'path'
import routers from './routes'
import { Passport } from 'passport'
import session from 'express-session'
import autentication from './autenticationGoogle/autentication'

class App {
  public express: express.Application

  constructor () {
    this.express = express()
    this.midlewares()
    this.routers()
  }

  private midlewares (): void {
    this.express.use(express.json())

    this.express.use(session({
      secret: 'Th46uN7ui',
      resave: false,
      saveUninitialized: true
    }))

    const passport = new Passport()
    this.express.use(passport.initialize())
    this.express.use(passport.session())

    this.express.use(express.static(path.join(__dirname, './public')))

    this.express.set('views engine', 'ejs')
    this.express.set('views', path.join(__dirname, './views'))
  }

  private routers (): void {
    this.express.use(routers, autentication)
  }
}

export default new App().express
