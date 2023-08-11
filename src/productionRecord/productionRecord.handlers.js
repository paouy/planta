import * as productionRecordService from './productionRecord.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const productionRecord = productionRecordService.createOne(data)

  return reply.send(productionRecord)
}

export const getAllByProductionOrder = (request, reply) => {
  const { productionOrderId } = request.query

  if (!productionOrderId) {
    return reply.code(400).send({
      error: 'Bad Request',
      message: 'Missing required query parameter: productionOrderId',
      statusCode: 400
    })
  }

  const productionRecords = productionRecordService.getAllByProductionOrder(productionOrderId)

  return reply.send(productionRecords)
}