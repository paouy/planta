import * as jobService from './job.service.js'

export const getAll = (request, reply) => {
  const { productionOrderId, operationBatchId } = request.query
  let jobs

  if (!productionOrderId && !operationBatchId) {
    jobs = jobService.getAllWithProductionOrderNotReleased()
  }

  if (productionOrderId) {
    jobs = jobService.getAllByProductionOrder(productionOrderId)
  }

  if (operationBatchId) {
    jobs = jobService.getAllByOperationBatch(operationBatchId)
  }

  return reply.send(jobs)
}

export const updateOne = (request, reply) => {
  const data = request.body
  jobService.updateOne(data)

  return reply.code(204).send()
}