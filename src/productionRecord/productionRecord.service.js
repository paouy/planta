import { jobService } from '../job/index.js'
import { productionOrderService } from '../productionOrder/index.js'
import { createProductionRecordRepository } from './productionRecord.repository.js'
import { transformToProductionRecordEntity } from './productionRecord.entity.js'

const productionRecordRepository = createProductionRecordRepository()

export const createOne = (data, forcePauseProduction = false) => {
  const insertedRow = productionRecordRepository.insertOne(data)
  const productionRecord = transformToProductionRecordEntity(insertedRow)

  const jobs = jobService.getAllByProductionOrder(productionRecord.productionOrderId)

  const job = jobs.find(
    ({ productionOrder, operation }) =>
      productionRecord.productionOrderId === productionOrder.id &&
      productionRecord.operation.id === operation.id
  )

  const keys = {
    OUTPUT: 'qtyOutput',
    REJECT: 'qtyReject',
    REWORK: 'qtyRework',
    SHORTFALL: 'qtyShortfall'
  }

  job[keys[productionRecord.type]] += productionRecord.qty

  const qtyMade = job.qtyOutput - job.qtyReject + job.qtyRework
  const qtyDemand = job.qtyInput - job.qtyShortfall

  job.status = qtyMade >= qtyDemand ? 'CLOSED' : 'IN_PROGRESS'
  job.timeTakenMins += productionRecord.timeTakenMins

  const productionOrderStatus =
    jobs.some(job => job.status !== 'CLOSED')
      ? 'IN_PROGRESS'
      : 'CLOSED'

  const productionOrder = {
    id: productionRecord.productionOrderId,
    status: productionOrderStatus
  }

  if (forcePauseProduction) {
    productionOrder.status = job.status = 'PAUSED'
  }

  jobService.updateOne(job)
  productionOrderService.updateOne(productionOrder)

  return productionRecord
}

export const getAllByProductionOrder = (productionOrderId) => {
  const productionRecords = productionRecordRepository
    .findAllByProductionOrderId(productionOrderId)
    .map(transformToProductionRecordEntity)

  return productionRecords
}