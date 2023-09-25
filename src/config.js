// const { NODE_ENV, PUBLIC_PATH, DB_PATH, JWK, HOST, PORT } = process.env
const PUBLIC_PATH='C:/snapshot/planta/public'
const DB_PATH='sqlite.db'
const JWK='{"kty":"EC","d":"ThzWGEa1N4eVPT9Ugx0Wtbgxbs25d-T5-EqYfhSNVNM","use":"sig","crv":"P-256","x":"FFPptiZ4PpUY5jw-SVCo9E9EPqoZtR5FWGjoNRGqPCw","y":"ilpbuz7Xm13dsQlBHCjADhVegsXGRcBlWhTjUoupdvo","alg":"ES256"}'
const HOST='localhost'
const PORT='4321'
const parsedJwk = JSON.parse(JWK)

export {
  PUBLIC_PATH,
  DB_PATH,
  parsedJwk as JWK,
  HOST,
  PORT
}