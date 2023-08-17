const {
  DB_PATH
} = process.env

const JWK = {
  "kty": "EC",
  "d": "ThzWGEa1N4eVPT9Ugx0Wtbgxbs25d-T5-EqYfhSNVNM",
  "use": "sig",
  "crv": "P-256",
  "x": "FFPptiZ4PpUY5jw-SVCo9E9EPqoZtR5FWGjoNRGqPCw",
  "y": "ilpbuz7Xm13dsQlBHCjADhVegsXGRcBlWhTjUoupdvo",
  "alg": "ES256"
}

export {
  DB_PATH,
  JWK
}