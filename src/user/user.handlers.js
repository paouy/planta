import * as userService from './user.service.js'

export const getAll = (request, reply) => {
  if (!request.user.isAdmin) {
    return reply.code(401).send({ error: 'Unauthorized' })
  }

  const users = userService.getAll()

  return reply.send(users)
}

export const updateOne = (request, reply) => {
  const data = request.body

  if (!request.user.isAdmin) {
    data.id = request.user.id
  }

  userService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  if (!request.user.isAdmin) {
    return reply.code(401).send({ error: 'Unauthorized' })
  }

  const { id } = request.params
  userService.deleteOne(id)

  return reply.code(204).send()
}