import * as metafieldService from './metafield.service.js'

export const createOne = (request, reply) => {
  if (!request.user.isAdmin) {
    return reply.code(401).send({ error: 'Unauthorized' })
  }

  const data = request.body
  const metafield = metafieldService.createOne(data)

  return reply.code(201).send(metafield)
}

export const getAll = (request, reply) => {
  const { resource } = request.query

  const metafields = resource
    ? metafieldService.getAllByResource(resource)
    : metafieldService.getAll()

  return reply.send(metafields)
}

export const updateOne = (request, reply) => {
  if (!request.user.isAdmin) {
    return reply.code(401).send({ error: 'Unauthorized' })
  }

  const data = request.body
  metafieldService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  if (!request.user.isAdmin) {
    return reply.code(401).send({ error: 'Unauthorized' })
  }
  
  const { id } = request.params
  metafieldService.deleteOne(id)

  return reply.code(204).send()
}