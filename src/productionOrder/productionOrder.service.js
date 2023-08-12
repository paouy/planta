import { allocationService } from '../allocation/index.js'
import { jobService } from '../job/index.js'
import { materialService } from '../material/index.js'
import { productService } from '../product/index.js'
import { productMaterialService } from '../productMaterial/index.js'
import { createProductionOrderRepository } from './productionOrder.repository.js'
import { transformToProductionOrderEntity } from './productionOrder.entity.js'

const productionOrderRepository = createProductionOrderRepository()

export const createOne = (data) => {
  const lastPriorityProductionOrder = productionOrderRepository
    .findOneNotReleasedLastPriority()

  data.priority = (lastPriorityProductionOrder?.priority || 0) + 1000
  
  const productionOrder = productionOrderRepository.insertOne(data)

  const product = productService.getOne(data.product.id)

  const jobsData = product.operationIds.map((operationId, index) => ({
    productionOrder: { id: productionOrder.id },
    operation: { id: operationId },
    status: 'OPEN',
    seq: index + 1
  }))

  jobService.createMany(jobsData)

  return transformToProductionOrderEntity(productionOrder)
}

export const getOne = (id) => {
  const productionOrder = productionOrderRepository.findOne(id)

  return transformToProductionOrderEntity(productionOrder)
}

export const getAllNotReleased = () => {
  const productionOrders = productionOrderRepository
    .findAllNotReleased()
    .map((data, index) => transformToProductionOrderEntity({ ...data, seq: index + 1 }))

  return productionOrders
}

export const getAllNotReleasedByProduct = (productId) => {
  const productionOrders = productionOrderRepository
    .findAllNotReleasedByProductId(productId)
    .map(transformToProductionOrderEntity)

  return productionOrders
}

export const getAllNotReleasedBySalesOrder = (salesOrderId) => {
  const productionOrders = productionOrderRepository
    .findAllNotReleasedBySalesOrderId(salesOrderId)
    .map(transformToProductionOrderEntity)

  return productionOrders
}

export const getAllReleased = () => {
  const productionOrders = productionOrderRepository
    .findAllReleased()
    .map(transformToProductionOrderEntity)

  return productionOrders
}

export const updateOne = (data) => {
  return productionOrderRepository.updateOne(data)
}

export const updateMany = (data) => {
  return productionOrderRepository.updateMany(data)
}

export const deleteOne = (id) => {
  return productionOrderRepository.deleteOne(id)
}

export const release = async (id) => {
  const returnedRow = productionOrderRepository.findOne(id)
  const productionOrder = transformToProductionOrderEntity(returnedRow)

  if (productionOrder.status !== 'CLOSED') {
    throw new Error('Production order is not yet closed')
  }

  const productMaterials = productMaterialService.getAllByProduct(productionOrder.product.id)

  productMaterials.forEach(({ material, qty }) => {
    materialService.increment({
      id: material.id,
      qty: productionOrder.qtyMade * qty * -1
    })
  })

  productService.increment({
    id: productionOrder.product.id,
    qty: productionOrder.qtyMade
  })

  if (productionOrder.salesOrderItemId) {
    allocationService.increment({
      salesOrderItem: {
        id: productionOrder.salesOrderItemId
      },
      qty: productionOrder.qtyMade
    })
  }

  productionOrderRepository.updateOne({ id, isReleased: true })
}