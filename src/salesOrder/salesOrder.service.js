import { allocationService } from '../allocation/index.js'
import { jobService } from '../job/index.js'
import { productionOrderService } from '../productionOrder/index.js'
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
  const returnedRow = salesOrderRepository.findOne(id)
  const salesOrder = transformToSalesOrderEntity(returnedRow)

  if (salesOrder.status !== 'OPEN') {
    throw new Error('Sales order cannot be confirmed')
  }

  const salesOrderItems = salesOrderItemService.getAllBySalesOrder(id)

  const salesOrderItemsWithPublicId = salesOrderItems.map((salesOrderItem, index) => {
    const publicId = `${salesOrder.publicId}/${index + 1}`
    return { ...salesOrderItem, publicId }
  })

  salesOrderItemService.updateMany(salesOrderItemsWithPublicId)

  const allocations = salesOrderItems.map(({ id }) => ({ salesOrderItem: { id }}))

  allocationService.createMany(allocations)

  salesOrderRepository.updateOne({ id, status: 'CONFIRMED' })
}

export const cancel = (data) => {
  const productionOrders = productionOrderService
    .getAllNotReleasedBySalesOrder(data.id)
    .map(({ id }) => ({ id, status: 'CANCELLED' }))

  productionOrderService.updateMany(productionOrders)

  allocationService.deleteManyBySalesOrder(data.id)

  jobService.cancelNotClosedBySalesOrder(data.id)

  return salesOrderRepository.updateOne(data)
}