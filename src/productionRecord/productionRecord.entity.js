import { decodeTime } from 'ulidx'

const transformToProductionRecordEntity = (schema) => {
  const {
    id,
    production_order_id,
    operation_id,
    workstation_id,
    equipment_id,
    worker_id,
    type,
    qty,
    meta,
    production_order_public_id,
    product_sku,
    operation_name,
    operation_is_batch,
    operation_time_per_cycle_mins,
    workstation_name,
    equipment_name,
    time_taken_mins,
    worker_public_id,
    worker_first_name,
    worker_last_name
  } = schema

  const productionRecord = {
    id,
    productionOrderId: production_order_id,
    operation: {
      id: operation_id,
      name: operation_name
    },
    workstation: null,
    equipment: null,
    worker: null,
    type: type.toUpperCase(),
    qty: Number(qty),
    timeTakenMins: Number(time_taken_mins),
    timestamp: decodeTime(id),
    meta: meta ? JSON.parse(meta) : null
  }

  if (production_order_public_id) {
    productionRecord.productionOrderPublicId = production_order_public_id
  }

  if (product_sku) {
    productionRecord.productSku = product_sku
  }

  if (workstation_id && workstation_name) {
    productionRecord.workstation = {
      id: workstation_id,
      name: workstation_name
    }
  }

  if (equipment_id && equipment_name) {
    productionRecord.equipment = {
      id: equipment_id,
      name: equipment_name
    }
  }

  if (worker_id && worker_public_id && worker_first_name && worker_last_name) {
    productionRecord.worker = {
      id: worker_id,
      name: `${worker_last_name}, ${worker_first_name} — ${worker_public_id}`
    }
  }

  if (operation_time_per_cycle_mins) {
    if (type.toUpperCase() !== 'REJECT') {
      if (operation_is_batch) {
        productionRecord.timeEstimatedMins = Number(operation_time_per_cycle_mins)
      } else {
        productionRecord.timeEstimatedMins = Number(qty) * Number(operation_time_per_cycle_mins)
      }
    } else {
      productionRecord.timeEstimatedMins = 0
    }
  }

  return productionRecord
}

export {
  transformToProductionRecordEntity
}