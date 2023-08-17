import { createPublicKey } from 'crypto'
import jwt from 'jsonwebtoken'
import { JWK } from './config.js'

export const verifyToken = (request, reply, done) => {
	const token = request.headers.authorization?.slice(7)

	if (!token) {
		return reply.code(401).send({ error: 'Unauthorized' })
	}

	const publicKey = createPublicKey({
		key: JWK,
		format: 'jwk',
		type: 'public'
	})

	jwt.verify(token, publicKey, (error, payload) => {
    if (error) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    request.user = {
      id: payload.id,
			isAdmin: payload.isAdmin
    }
  })

  done()
}