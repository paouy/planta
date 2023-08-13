import { createAllocationRepository } from './allocation.repository.js'
import { transformToAllocationEntity } from './allocation.entity.js'

const allocationRepository = createAllocationRepository()

export const createMany = (data) => {
  return allocationRepository.insertMany(data)
}

export const getAllBySalesOrderItem = (salesOrderItemId) => {
  const allocations = allocationRepository
    .findAllBySalesOrderItemId(salesOrderItemId)
    .map(transformToAllocationEntity)

  return allocations
}

export const getAllByProduct = (productId) => {
  const allocations = allocationRepository
    .findAllByProductId(productId)
    .map(transformToAllocationEntity)

  return allocations
}

export const increment = (data) => {
  return allocationRepository.incrementQty(data)
}

export const resetManyBySalesOrder = (salesOrderId) => {
  return allocationRepository.resetQtyBySalesOrderId(salesOrderId)
}

export const deleteManyBySalesOrder = (salesOrderId) => {
  return allocationRepository.deleteManyBySalesOrderId(salesOrderId)
}