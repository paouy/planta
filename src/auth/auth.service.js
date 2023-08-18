import { createPrivateKey } from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWK } from '../config.js'
import { userService } from '../user/index.js'

export const login = async ({ username, password }) => {
  const user = userService.getOneByUsername(username)

  if (!user || user.isDisabled) {
    throw new Error('Unauthorized')
  }

  const { id, firstName, lastName, passwordHash, isAdmin } = user

  const isCorrectPassword = await bcrypt.compare(password, passwordHash)

  if (!isCorrectPassword) {
    throw new Error('Unauthorized')
  }

  const privateKey = createPrivateKey({
    key: JWK,
    format: 'jwk',
    type: 'sec1'
  })

  const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 24)

  const token = jwt.sign({ id, isAdmin }, privateKey, { algorithm: 'ES256', expiresIn })

  userService.updateOne({ id, lastLogin: Date.now() })

  return {
    user: {
      id,
      firstName,
      lastName,
      isAdmin
    },
    token,
    expiresIn
  }
}

export const updatePassword = async ({ id, password }) => {
  const passwordHash = await bcrypt.hash(password, 10)

  userService.updateOne({ id, passwordHash })
}