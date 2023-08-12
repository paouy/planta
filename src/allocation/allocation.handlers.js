import * as allocationService from './allocation.service.js'

export const getAll = (request, reply) => {
  const { salesOrderItemId, productId } = request.query

  if (!salesOrderItemId && !productId) {
    return reply.code(400).send({
      error: 'Bad Request',
      message: 'Missing required query parameter: salesOrderItemId or productId',
      statusCode: 400
    })
  }

  let allocations

  if (salesOrderItemId) {
    allocations = allocationService.getAllBySalesOrderItem(salesOrderItemId)
  }

  if (productId) {
    allocations = allocationService.getAllByProduct(productId)
  }

  return reply.send(allocations)
}

export const increment = (request, reply) => {
  const data = request.body
  allocationService.increment(data)

  return reply.code(204).send()
}