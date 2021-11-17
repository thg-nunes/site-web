import express from 'express'
import path from 'path'
import passport from 'passport'
import session from 'express-session'
import autentication from './autenticationGoogle/autentication'
import routers from './routes'
const app = express()

app.use(express.json())
app.use(session({ secret: 'Th46uN7ui', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(routers)
app.use(autentication)

app.use(express.static(path.join(__dirname, './public')))

app.set('views engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

export default app
