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