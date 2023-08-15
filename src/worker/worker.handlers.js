import * as workerService from './worker.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const worker = workerService.createOne(data)

  return reply.code(201).send(worker)
}

export const getAll = (request, reply) => {
  const workers = workerService.getAll()

  return reply.send(workers)
}

export const updateOne = (request, reply) => {
  const data = request.body
  workerService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  workerService.deleteOne(id)

  return reply.code(204).send()
}