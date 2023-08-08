import * as operationBatchService from './operationBatch.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const operationBatch = operationBatchService.createOne(data)

  return reply.code(201).send(operationBatch)
}

export const getOne = (request, reply) => {
  const { id } = request.params
  const operationBatch = operationBatchService.getOne(id)

  return reply.send(operationBatch)
}

export const getAllNotClosed = (request, reply) => {
  const operationBatches = operationBatchService.getAllNotClosed()

  return reply.send(operationBatches)
}

export const updateOne = (request, reply) => {
  const data = request.body
  operationBatchService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  operationBatchService.deleteOne(id)

  return reply.code(204).send()
}