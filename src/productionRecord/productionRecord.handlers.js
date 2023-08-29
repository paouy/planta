import * as productionRecordService from './productionRecord.service.js'

export const create = (request, reply) => {
  const data = request.body

  if (Array.isArray(data)) {
    productionRecordService.createMany(data)

    return reply.code(204).send()
  } else {
    const productionRecord = productionRecordService.createOne(data)

    return reply.send(productionRecord)
  }
}

export const getAll = (request, reply) => {
  const { from, to, productionOrderId } = request.query

  if (!from && !to && !productionOrderId) {
    return reply.code(400).send({
      error: 'Bad Request',
      message: 'Missing required query parameter: from or to or productionOrderId',
      statusCode: 400
    })
  }

  let productionRecords

  if (from || to) {
    productionRecords = productionRecordService.getAllBetweenTimestamps(from, to)
  }

  if (productionOrderId) {
    productionRecords = productionRecordService.getAllByProductionOrder(productionOrderId)
  }

  return reply.send(productionRecords)
}