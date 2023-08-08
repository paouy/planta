import * as operationBatchJobService from './operationBatchJob.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  operationBatchJobService.createOne(data)

  return reply.code(201).send()
}

export const deleteOne = (request, reply) => {
  const data = request.body
  operationBatchJobService.deleteOne(data)

  return reply.code(204).send()
}