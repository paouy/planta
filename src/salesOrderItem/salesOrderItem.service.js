import { createSalesOrderItemRepository } from './salesOrderItem.repository.js'
import { transformToSalesOrderItemEntity } from './salesOrderItem.entity.js'

const salesOrderItemRepository = createSalesOrderItemRepository()

export const createOne = (data) => {
  const salesOrderItem = salesOrderItemRepository.insertOne(data)

  return transformToSalesOrderItemEntity(salesOrderItem)
}

export const createMany = (data) => {
  return salesOrderItemRepository.insertMany(data)
}

export const getOne = (id) => {
  const salesOrderItem = salesOrderItemRepository.findOne(id)

  return transformToSalesOrderItemEntity(salesOrderItem)
}

export const getAllBySalesOrder = (salesOrderId) => {
  const salesOrderItems = salesOrderItemRepository
    .findAllBySalesOrderId(salesOrderId)
    .map(transformToSalesOrderItemEntity)

  return salesOrderItems
}

export const updateOne = (data) => {
  return salesOrderItemRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return salesOrderItemRepository.deleteOne(id)
}