import { createProductionOrderRepository } from './productionOrder.repository.js'
import { transformToProductionOrderEntity } from './productionOrder.entity.js'

const productionOrderRepository = createProductionOrderRepository()

export const createOne = (data) => {
  const productionOrder = productionOrderRepository.insertOne(data)

  return transformToProductionOrderEntity(productionOrder)
}

export const getOne = (id) => {
  const productionOrder = productionOrderRepository.findOne(id)

  return transformToProductionOrderEntity(productionOrder)
}

export const getAllNotReleased = () => {
  const productionOrders = productionOrderRepository
    .findAllNotReleased()
    .map(transformToProductionOrderEntity)

  return productionOrders
}

export const getAllNotReleasedByProduct = (productId) => {
  const productionOrders = productionOrderRepository
    .findAllNotReleasedByProductId(productId)
    .map(transformToProductionOrderEntity)

  return productionOrders
}

export const getAllReleased = () => {
  const productionOrders = productionOrderRepository
    .findAllReleased()
    .map(transformToProductionOrderEntity)

  return productionOrders
}

export const updateOne = (data) => {
  return productionOrderRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return productionOrderRepository.deleteOne(id)
}