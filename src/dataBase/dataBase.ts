import mysql2, { Connection } from 'mysql2'

class ConexaoDataBase {
  conectarDataBase: Connection = null

  constructor () {
    this.conectarDataBase = this.conectar()
  }

  private conectar (): Connection {
    if (this.conectarDataBase !== null) return this.conectarDataBase
    this.conectarDataBase = mysql2.createConnection({
      database: 'site_web',
      user: 'root',
      host: 'localhost',
      password: '1520'
    })
    return this.conectarDataBase
  }
}

export default new ConexaoDataBase().conectarDataBase
