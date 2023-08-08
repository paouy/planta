import { createOperationBatchJobRepository } from './operationBatchJob.repository.js'

const operationBatchJobRepository = createOperationBatchJobRepository()

export const createOne = (data) => {
  return operationBatchJobRepository.insertOne(data)
}

export const deleteOne = (data) => {
  return operationBatchJobRepository.deleteOne(data)
}