const { DB_PATH, JWK, HOST, PORT } = process.env

const parsedJwk = JSON.parse(JWK)

export {
  DB_PATH,
  parsedJwk as JWK,
  HOST,
  PORT
}