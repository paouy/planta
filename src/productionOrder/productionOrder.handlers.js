import * as productionOrderService from './productionOrder.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const productionOrder = productionOrderService.createOne(data)

  return reply.code(201).send(productionOrder)
}

export const getOne = (request, reply) => {
  const { id } = request.params
  const productionOrder = productionOrderService.getOne(id)

  return reply.send(productionOrder)
}

export const getAllNotReleased = (request, reply) => {
  const { productId } = request.query
  const productionOrders = productId
    ? productionOrderService.getAllNotReleasedByProduct(productId)
    : productionOrderService.getAllNotReleased()

  return reply.send(productionOrders)
}

export const getAllReleased = (request, reply) => {
  const productionOrders = productionOrderService.getAllReleased()

  return reply.send(productionOrders)
}

export const updateOne = (request, reply) => {
  const data = request.body
  productionOrderService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  productionOrderService.deleteOne(id)

  return reply.code(204).send()
}