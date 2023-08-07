import * as operationService from './operation.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const operation = operationService.createOne(data)

  return reply.code(201).send(operation)
}

export const getAll = (request, reply) => {
  const operations = operationService.getAll()

  return reply.send(operations)
}

export const updateOne = (request, reply) => {
  const data = request.body
  operationService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  operationService.deleteOne(id)

  return reply.code(204).send()
}