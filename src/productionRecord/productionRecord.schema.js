import { ulid } from 'ulidx'

const mapToProductionRecordSchema = (data) => {
  const schema = {
    id: data.id || ulid(),
    production_order_id: data.productionOrderId,
    operation_id: data.operation.id,
    workstation_id: data.workstation?.id || null,
    equipment_id: data.equipment?.id || null,
    worker_id: data.worker?.id || null,
    type: data.type.toUpperCase(),
    qty: Number(data.qty),
    time_taken_mins: Number(data.timeTakenMins || 0)
  }

  return schema
}

export {
  mapToProductionRecordSchema
}