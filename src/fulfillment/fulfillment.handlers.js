import * as fulfillmentService from './fulfillment.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const fulfillment = fulfillmentService.createOne(data)

  return reply.code(201).send(fulfillment)
}

export const getAllBySalesOrderItem = (request, reply) => {
  const { salesOrderItemId } = request.query

  if (!productId) {
    return reply.code(400).send({
      error: 'Bad Request',
      message: 'Missing required query parameter: productId',
      statusCode: 400
    })
  }

  const fulfillments = fulfillmentService.getAllBySalesOrderItem(salesOrderItemId)

  return reply.send(fulfillments)
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  fulfillmentService.deleteOne(id)

  return reply.code(204).send()
}