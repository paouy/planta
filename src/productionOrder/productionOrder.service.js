import { productService } from '../product/index.js'
import { jobService } from '../job/index.js'
import { createProductionOrderRepository } from './productionOrder.repository.js'
import { transformToProductionOrderEntity } from './productionOrder.entity.js'

const productionOrderRepository = createProductionOrderRepository()

export const createOne = (data) => {
  const lastPriorityProductionOrder = productionOrderRepository
    .findLastPriorityNotReleased()

  data.priority = (lastPriorityProductionOrder?.priority || 0) + 1000
  
  const productionOrder = productionOrderRepository.insertOne(data)

  const product = productService.getOne(data.product.id)

  const jobsData = product.operationIds.map((operationId, index) => ({
    productionOrder: { id: productionOrder.id },
    operation: { id: operationId },
    status: 'OPEN',
    seq: index + 1
  }))

  jobService.createMany(jobsData)

  return transformToProductionOrderEntity(productionOrder)
}

export const getOne = (id) => {
  const productionOrder = productionOrderRepository.findOne(id)

  return transformToProductionOrderEntity(productionOrder)
}

export const getAllNotReleased = () => {
  const productionOrders = productionOrderRepository
    .findAllNotReleased()
    .map((data, index) => transformToProductionOrderEntity({ ...data, seq: index + 1 }))

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