// import { randomBytes } from 'crypto'

// const buf = randomBytes(16)

// console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`)

// import { createPrivateKey } from 'crypto'
// import jwt from 'jsonwebtoken'

// let privateKey = `b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAaAAAABNlY2RzYS1zaGEyLW5pc3RwMjU2AAAACG5pc3RwMjU2AAAAQQQr8sQ0z5g2VVjZjnuLGHu9+T91rHrAPKv9yQwy4ZwUoIeR2TJnipQ7BrtRKEkJtGM7qMJPo/8oent03t0xfqSqAAAAqF+hYJVfoWCVAAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBCvyxDTPmDZVWNmOe4sYe735P3WsesA8q/3JDDLhnBSgh5HZMmeKlDsGu1EoSQm0Yzuowk+j/yh6e3Te3TF+pKoAAAAhAOuxj2wp1iUohqtEyt+Ie+LzvuvbqnVpEDJrXcqs5dDRAAAACXBhb2xvQHhwcwECAwQFBg==`

//   privateKey = createPrivateKey({
//     key: {
//       "kty": "EC",
//       "d": "UU-5FM02bHkuvkso37OfXEoPOFn1Lu2FGlYn4yxuWIA",
//       "use": "sig",
//       "crv": "P-256",
//       "x": "Qx3ahfH3OKIHyuY-yLIh-OZNu9JzfKrLKezfSGgVU-g",
//       "y": "QeVzUobqbePMPnb3B50M9tbk3o-IG4ecYa7Igbjr3Ak",
//       "alg": "ES256"
//   },
//     format: 'jwk',
//     type: 'sec1'
//   })
//   const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 24)

//  const lol= jwt.sign({ id: 'lol', admin: true }, privateKey, { algorithm: 'ES256', expiresIn })

// console.log(lol)