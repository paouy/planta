import * as salesOrderItemService from './salesOrderItem.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const salesOrderItem = salesOrderItemService.createOne(data)

  return reply.code(201).send(salesOrderItem)
}

export const getOne = (request, reply) => {
  const { id } = request.params
  const salesOrderItem = salesOrderItemService.getOne(id)

  return reply.send(salesOrderItem)
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

  const salesOrderItems = salesOrderItemService.getAllBySalesOrder(salesOrderId)

  return reply.send(salesOrderItems)
}

export const updateOne = (request, reply) => {
  const data = request.body
  salesOrderItemService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  salesOrderItemService.deleteOne(id)

  return reply.code(204).send()
}