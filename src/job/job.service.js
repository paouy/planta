import { createJobRepository } from './job.repository.js'
import { transformToJobEntity } from './job.entity.js'

const jobRepository = createJobRepository()

export const createMany = (data) => {
  return jobRepository.insertMany(data)
}

export const getAllByProductionOrder = (productionOrderId) => {
  const jobs = jobRepository
    .findAllByProductionOrderId(productionOrderId)
    .map(transformToJobEntity)

  return jobs
}

export const getAllByOperationBatch = (operationBatchId) => {
  const jobs = jobRepository
    .findAllByOperationBatchId(operationBatchId)
    .map(transformToJobEntity)

  return jobs
}

export const getAllWithProductionOrderNotReleased = () => {
  const jobs = jobRepository
    .findAllWithProductionOrderNotReleased()
    .map(transformToJobEntity)

  return jobs
}

export const updateOne = (data) => {
  return jobRepository.updateOne(data)
}

export const updateOneByProductionOrderAndOperation = (data) => {
  return jobRepository.updateOneByProductionOrderIdAndOperationId(data)
}

export const updateMany = (data) => {
  return jobRepository.updateMany(data)
}

export const cancelManyNotClosedByProductionOrder = (productionId) => {
  return jobRepository.cancelManyNotClosedByProductionOrderId(productionId)
}

export const cancelNotClosedBySalesOrder = (salesOrderId) => {
  return jobRepository.cancelManyNotClosedBySalesOrderId(salesOrderId)
}