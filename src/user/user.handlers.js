import * as userService from './user.service.js'

export const getAll = (request, reply) => {
  const users = userService.getAll()

  return reply.send(users)
}

export const updateOne = (request, reply) => {
  const data = request.body
  userService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  userService.deleteOne(id)

  return reply.code(204).send()
}