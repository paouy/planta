import { allocationService } from '../allocation/index.js'
import { productService } from '../product/index.js'
import { salesOrderService } from '../salesOrder/index.js'
import { salesOrderItemService } from '../salesOrderItem/index.js'
import { createFulfillmentRepository } from './fulfillment.repository.js'
import { transformToFulfillmentEntity } from './fulfillment.entity.js'

const fulfillmentRepository = createFulfillmentRepository()

export const createOne = (data) => {
  const insertedRow = fulfillmentRepository.insertOne(data)
  const fulfillment = transformToFulfillmentEntity(insertedRow)

  allocationService.increment({
    salesOrderItem: { id: fulfillment.salesOrderItemId },
    qty: fulfillment.qty * -1
  })

  productService.increment({
    id: fulfillment.productId,
    qty: fulfillment.qty * -1
  })

  const salesOrderItems = salesOrderItemService.getAllBySalesOrder(fulfillment.salesOrderId)

  const isSalesOrderPartiallyFulfilled = salesOrderItems
    .map(({ qty, qtyFulfilled }) => qtyFulfilled >= qty )
    .some(value => value === false)

  const salesOrderStatus = isSalesOrderPartiallyFulfilled ? 'PARTIALLY_FULFILLED' : 'FULFILLED'

  salesOrderService.updateOne({
    id: fulfillment.salesOrderId,
    status: salesOrderStatus
  })
}

export const getAllBySalesOrderItem = (salesOrderItemId) => {
  const fulfillments = fulfillmentRepository
    .findAllBySalesOrderItemId(salesOrderItemId)
    .map(transformToFulfillmentEntity)

  return fulfillments
}

export const deleteOne = (id) => {
  const returnedRow = fulfillmentRepository.findOne(id)
  const fulfillment = transformToFulfillmentEntity(returnedRow)

  fulfillmentRepository.deleteOne(id)

  allocationService.increment({
    salesOrderItem: { id: fulfillment.salesOrderItemId },
    qty: fulfillment.qty
  })

  productService.increment({
    id: fulfillment.productId,
    qty: fulfillment.qty
  })

  const salesOrderItems = salesOrderItemService.getAllBySalesOrder(fulfillment.salesOrderId)

  const isSalesOrderNotFulfilled = salesOrderItems
    .map(({ qty, qtyFulfilled }) => qtyFulfilled >= qty)
    .every(value => value === false)

  const salesOrderStatus = isSalesOrderNotFulfilled ? 'CONFIRMED' : 'PARTIALLY_FULFILLED'

  salesOrderService.updateOne({
    id: fulfillment.salesOrderId,
    status: salesOrderStatus
  })
}