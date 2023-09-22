import { ulid } from 'ulidx'

const mapToProductionRecordSchema = (data) => {
  const schema = {
    production_order_id: data.productionOrderId,
    operation_id: data.operation.id,
    workstation_id: data.workstation?.id || null,
    equipment_id: data.equipment?.id || null,
    worker_id: data.worker?.id || null,
    type: data.type.toUpperCase(),
    qty: Number(data.qty),
    time_taken_mins: Number(data.timeTakenMins || 0)
  }

  if ('id' in data) {
    schema.id = data.id
  } else if ('timestamp' in data) {
    schema.id = ulid(data.timestamp)
  } else {
    schema.id = ulid()
  }

  if ('meta' in data) {
    schema.meta = JSON.stringify(data.meta)
  }

  return schema
}

export {
  mapToProductionRecordSchema
}