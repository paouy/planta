import { ulid } from 'ulidx'

const mapToJobSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if (data.productionOrder?.id) {
    schema.production_order_id = data.productionOrder.id
  }

  if (data.operation?.id) {
    schema.operation_id = data.operation.id
  }

  if (data.workstation?.id) {
    schema.workstation_id = data.workstation.id
  }

  if ('status' in data) {
    schema.status = data.status.toUpperCase()
  }

  if ('qtyOutput' in data) {
    schema.qty_output = Number(data.qtyOutput)
  }

  if ('qtyReject' in data) {
    schema.qty_reject = Number(data.qtyReject)
  }

  if ('qtyRework' in data) {
    schema.qty_rework = Number(data.qtyRework)
  }

  if ('qtyShortfall' in data) {
    schema.qty_shortfall = Number(data.qtyShortfall)
  }

  if ('timeTakenMins' in data) {
    schema.time_taken_mins = Number(data.timeTakenMins)
  }

  if ('seq' in data) {
    schema.seq = Number(data.seq)
  }

  return schema
}

export {
  mapToJobSchema
}