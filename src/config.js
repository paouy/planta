const { DB_PATH, JWK, PORT } = process.env

const parsedJwk = JSON.parse(JWK)

export {
  DB_PATH,
  parsedJwk as JWK,
  PORT
}