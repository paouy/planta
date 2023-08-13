import { createOperationBatchJobRepository } from './operationBatchJob.repository.js'

const operationBatchJobRepository = createOperationBatchJobRepository()

export const createOne = (data) => {
  return operationBatchJobRepository.insertOne(data)
}

export const deleteOne = (data) => {
  return operationBatchJobRepository.deleteOne(data)
}

export const deleteManyByProductionOrder = (productionOrderId) => {
  return operationBatchJobRepository.deleteManyByProductionOrderId(productionOrderId)
}

export const deleteManyBySalesOrder = (salesOrderId) => {
  return operationBatchJobRepository.deleteManyBySalesOrderId(salesOrderId)
}