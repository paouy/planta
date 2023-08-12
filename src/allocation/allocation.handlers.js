import * as allocationService from './allocation.service.js'

export const getAll = (request, reply) => {
  const { salesOrderItemId, productId } = request.query
  let allocations = []

  if (salesOrderItemId) {
    allocations = allocationService.getAllBySalesOrderItem(salesOrderItemId)
  }

  if (productId) {
    allocations = allocationService.getAllByProduct(productId)
  }

  return reply.send(allocations)
}

export const updateOne = (request, reply) => {
  const data = request.body
  allocationService.updateOne(data)

  return reply.code(204).send()
}