export interface DadosUsuario {
  name?: {
    givenName: string
  }
  photos?: [{ value: string }]
  emails?: [ {value: string, verified: boolean} ]
}
