import bcrypt from 'bcryptjs'
import { createUserRepository } from './user.repository.js'
import { transformToUserEntity } from './user.entity.js'

const userRepository = createUserRepository()

export const createOne = async (data) => {
  const { firstName, lastName, username, isAdmin, isDisabled, password } = data

  const passwordHash = await bcrypt.hash(password, 10)

  return userRepository.insertOne({
    firstName,
    lastName,
    username,
    passwordHash,
    isAdmin,
    isDisabled
  })
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

export const updateOne = ({ passwordHash, ...data }) => {
  return userRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return userRepository.deleteOne(id)
}