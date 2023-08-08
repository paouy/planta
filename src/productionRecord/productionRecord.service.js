import { createProductionRecordRepository } from './productionRecord.repository.js'
import { transformToProductionRecordEntity } from './productionRecord.entity.js'

const productionRecordRepository = createProductionRecordRepository()

export const createOne = (data) => {
  return productionRecordRepository.insertOne(data)
}

export const getAllByProductionOrder = (productionOrderId) => {
  const productionRecords = productionRecordRepository
    .findAllByProductionOrderId(productionOrderId)
    .map(transformToProductionRecordEntity)

  return productionRecords
}