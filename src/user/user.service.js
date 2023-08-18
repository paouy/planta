import bcrypt from 'bcryptjs'
import { createUserRepository } from './user.repository.js'
import { transformToUserEntity } from './user.entity.js'

const userRepository = createUserRepository()

export const createOne = async (data) => {
  const { firstName, lastName, username, isAdmin, password } = data

  const passwordHash = await bcrypt.hash(password, 10)

  const insertedRow = userRepository.insertOne({
    firstName,
    lastName,
    username,
    passwordHash,
    isAdmin
  })

  return transformToUserEntity(insertedRow)
}

export const getOne = (id) => {
  const returnedRow = userRepository.findOne(id)

  return transformToUserEntity(returnedRow)
}

export const getOneByUsername = (username) => {
  const returnedRow = userRepository.findOneByUsername(username)

  if (!returnedRow) {
    return null
  }

  return transformToUserEntity(returnedRow)
}

export const getAll = () => {
  const users = userRepository
    .findAll()
    .map(transformToUserEntity)

  return users
}

export const updateOne = (data) => {
  return userRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return userRepository.deleteOne(id)
}