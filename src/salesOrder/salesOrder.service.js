import { allocationService } from '../allocation/index.js'
import { jobService } from '../job/index.js'
import { operationBatchJobService } from '../operationBatchJob/index.js'
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

export const getAllArchived = () => {
  const salesOrders = salesOrderRepository
    .findAllArchived()
    .map(transformToSalesOrderEntity)

  return salesOrders
}

export const getAllNotArchived = () => {
  const salesOrders = salesOrderRepository
    .findAllNotArchived()
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

  const allocations = salesOrderItems.map(({ id }) => ({ salesOrderItem: { id } }))

  allocationService.createMany(allocations)

  salesOrderRepository.updateOne({ id, status: 'CONFIRMED' })
}

export const forceFulfilledStatus = (id) => {
  allocationService.resetManyBySalesOrder(id)
  salesOrderRepository.updateOne({ id, status: 'FULFILLED' })
}

export const archive = (id) => {
  allocationService.deleteManyBySalesOrder(id)
  salesOrderRepository.updateOne({ id, isArchived: true })
}

export const cancel = (data) => {
  const productionOrders = productionOrderService
    .getAllNotReleasedBySalesOrder(data.id)
    .map(({ id }) => ({ id, status: 'CANCELLED' }))

  productionOrderService.updateMany(productionOrders)

  allocationService.deleteManyBySalesOrder(data.id)

  operationBatchJobService.deleteManyBySalesOrder(data.id)

  jobService.cancelNotClosedBySalesOrder(data.id)

  salesOrderRepository.updateOne({ ...data, isArchived: true })
}