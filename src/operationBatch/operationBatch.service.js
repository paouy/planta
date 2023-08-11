import { jobService } from '../job/index.js'
import { productionOrderService } from '../productionOrder/index.js'
import { productionRecordService } from '../productionRecord/index.js'
import { createOperationBatchRepository } from './operationBatch.repository.js'
import { transformToOperationBatchEntity } from './operationBatch.entity.js'

const operationBatchRepository = createOperationBatchRepository()

export const createOne = (data) => {
  const operationBatch = operationBatchRepository.insertOne(data)

  return transformToOperationBatchEntity(operationBatch)
}

export const getOne = (id) => {
  const operationBatch = operationBatchRepository.findOne(id)

  return transformToOperationBatchEntity(operationBatch)
}

export const getAllNotClosed = () => {
  const operationBatches = operationBatchRepository
    .findAllNotClosed()
    .map(transformToOperationBatchEntity)

  return operationBatches
}

export const updateOne = (data) => {
  return operationBatchRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return operationBatchRepository.deleteOne(id)
}

export const start = (id) => {
  const status = 'IN_PROGRESS'

  operationBatchRepository.updateOne({ id, status })

  const operationBatchJobs = jobService.getAllByOperationBatch(id)

  const updatedJobs = operationBatchJobs.map(job => ({ id: job.id, status }))
  jobService.updateMany(updatedJobs)

  operationBatchJobs
    .filter(job => job.status !== status)
    .forEach(job => productionOrderService.updateOne({ id: job.productionOrder.id, status }))
}

export const createReport = async ({ id, productionRecords, ...metadata }) => {
  for (const { requiresRework, ...data } of productionRecords) {
    const productionRecord = { ...data, ...metadata }
    productionRecordService.createOne(productionRecord, requiresRework)

    if (requiresRework) {
      const job = {
        productionOrder: { id: productionRecord.productionOrderId },
        operation: { id: metadata.operation.id },
        workstation: null
      }

      jobService.updateOneByProductionOrderAndOperation(job)
    }
  }

  operationBatchRepository.updateOne({ id, status: 'CLOSED' })
}