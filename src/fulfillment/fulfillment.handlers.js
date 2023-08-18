import * as fulfillmentService from './fulfillment.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const fulfillment = fulfillmentService.createOne(data)

  return reply.code(201).send(fulfillment)
}

export const getAllBySalesOrder = (request, reply) => {
  const { salesOrderId } = request.query

  if (!salesOrderId) {
    return reply.code(400).send({
      error: 'Bad Request',
      message: 'Missing required query parameter: salesOrderId',
      statusCode: 400
    })
  }

  const fulfillments = fulfillmentService.getAllBySalesOrder(salesOrderId)

  return reply.send(fulfillments)
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  fulfillmentService.deleteOne(id)

  return reply.code(204).send()
}