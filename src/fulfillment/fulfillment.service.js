import { createFulfillmentRepository } from './fulfillment.repository.js'
import { transformToFulfillmentEntity } from './fulfillment.entity.js'

const fulfillmentRepository = createFulfillmentRepository()

export const createOne = (data) => {
  return fulfillmentRepository.insertOne(data)
}

export const getAllBySalesOrderItem = (salesOrderItemId) => {
  const fulfillments = fulfillmentRepository
    .findAllBySalesOrderItemId(salesOrderItemId)
    .map(transformToFulfillmentEntity)

  return fulfillments
}

export const deleteOne = (id) => {
  return fulfillmentRepository.deleteOne(id)
}