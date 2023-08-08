import { createAllocationRepository } from './allocation.repository.js'
import { transformToAllocationEntity } from './allocation.entity.js'

const allocationRepository = createAllocationRepository()

export const createOne = (data) => {
  return allocationRepository.insertOne(data)
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

export const updateOne = (data) => {
  return allocationRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return allocationRepository.deleteOne(id)
}