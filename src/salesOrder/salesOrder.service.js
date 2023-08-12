import { salesOrderItemService } from '../salesOrderItem/index.js'
import { createSalesOrderRepository } from './salesOrder.repository.js'
import { transformToSalesOrderEntity } from './salesOrder.entity.js'

const salesOrderRepository = createSalesOrderRepository()

export const createOne = ({ items, ...data }) => {
  const insertedRow = salesOrderRepository.insertOne(data)
  const salesOrder = transformToSalesOrderEntity(insertedRow)
  const salesOrderItems = items.map(item => ({ salesOrderId: salesOrder.id, ...item }))

  salesOrderItemService.createMany(salesOrderItems)

  return salesOrder
}

export const getOne = (id) => {
  const salesOrder = salesOrderRepository.findOne(id)

  if (!salesOrder) {
    throw new Error('Not Found')
  }

  return transformToSalesOrderEntity(salesOrder)
}

export const getAllFulfilled = () => {
  const salesOrders = salesOrderRepository
    .findAllWithStatusFulfilled()
    .map(transformToSalesOrderEntity)

  return salesOrders
}

export const getAllNotFulfilled = () => {
  const salesOrders = salesOrderRepository
    .findAllWithStatusNotFulfilled()
    .map(transformToSalesOrderEntity)

  return salesOrders
}

export const updateOne = (data) => {
  return salesOrderRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return salesOrderRepository.deleteOne(id)
}

export const confirm = (id) => {
  // Implement: Set salesOrderItems public ID
  return salesOrderRepository.updateOne({ id, status: 'CONFIRMED' })
}

export const cancel = (data) => {
  return salesOrderRepository.updateOne(data)
}