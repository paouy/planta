import { createOperationRepository } from './operation.repository.js'
import { transformToOperationEntity } from './operation.entity.js'

const operationRepository = createOperationRepository()

export const createOne = (data) => {
  const operation = operationRepository.insertOne(data)

  return transformToOperationEntity(operation)
}

export const getAll = () => {
  const operations = operationRepository
    .findAll()
    .map(transformToOperationEntity)

  return operations
}

export const updateOne = (data) => {
  return operationRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return operationRepository.deleteOne(id)
}