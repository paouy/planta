import { ulid } from 'ulidx'
import { jobService } from '../job/index.js'
import { metafieldService } from '../metafield/index.js'
import { productionOrderService } from '../productionOrder/index.js'
import { createProductionRecordRepository } from './productionRecord.repository.js'
import { transformToProductionRecordEntity } from './productionRecord.entity.js'

const productionRecordRepository = createProductionRecordRepository()

export const createOne = (data, forcePauseJob = false) => {
  const insertedRow = productionRecordRepository.insertOne(data)
  const productionRecord = transformToProductionRecordEntity(insertedRow)

  const jobs = jobService.getAllByProductionOrder(productionRecord.productionOrderId)
  const job = jobs.find(({ operation }) => productionRecord.operation.id === operation.id)
  const prevJob = jobs.find(({ seq }) => job.seq === seq + 1)

  const keys = {
    OUTPUT: 'qtyOutput',
    REJECT: 'qtyReject',
    REWORK: 'qtyRework',
    SHORTFALL: 'qtyShortfall'
  }

  job[keys[productionRecord.type]] += productionRecord.qty
  job.timeTakenMins += productionRecord.timeTakenMins

  const qtyMade = job.qtyOutput - job.qtyReject + job.qtyRework
  const qtyDemand = job.qtyInput - job.qtyShortfall

  job.status = qtyMade >= qtyDemand ? 'CLOSED' : 'IN_PROGRESS'

  if (job.operation.isBatch && job.status === 'CLOSED') {
    job.workstation = null
  }

  if ((job.status === 'CLOSED' && job.seq > 1 && prevJob?.status !== 'CLOSED') || forcePauseJob) {
    job.status = 'PAUSED'
  }

  const productionOrderStatus =
    jobs.some(job => job.status !== 'CLOSED')
      ? 'IN_PROGRESS'
      : 'CLOSED'

  const productionOrder = {
    id: productionRecord.productionOrderId,
    status: productionOrderStatus
  }

  jobService.updateOne(job)
  productionOrderService.updateOne(productionOrder)

  return productionRecord
}

export const getAllBetweenTimestamps = (from, to) => {
  const ids = { from: ulid(Number(from)), to: ulid(Number(to)) }
  const metafields = metafieldService.getAllByResource('OPERATION')
  const productionRecords = productionRecordRepository
    .findAllBetweenIds(ids)
    .map(transformToProductionRecordEntity)
    .map(productionRecord => {
      if (productionRecord.meta) {
        Object.keys(productionRecord.meta).forEach(id => {
          const { name } = metafields.find(metafield => id === metafield.id)
          productionRecord.meta[id].label = name
        })
      }

      return productionRecord
    })

  return productionRecords
}

export const getAllByProductionOrder = (productionOrderId) => {
  const metafields = metafieldService.getAllByResource('OPERATION')
  const productionRecords = productionRecordRepository
    .findAllByProductionOrderId(productionOrderId)
    .map(transformToProductionRecordEntity)
    .map(productionRecord => {
      if (productionRecord.meta) {
        Object.keys(productionRecord.meta).forEach(id => {
          const { name } = metafields.find(metafield => id === metafield.id)
          productionRecord.meta[id].label = name
        })
      }

      return productionRecord
    })

  return productionRecords
}