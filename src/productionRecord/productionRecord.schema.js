import { ulid } from 'ulidx'

const mapToProductionRecordSchema = (data) => {
  const schema = {
    id: data.id || ulid(),
    production_order_id: data.productionOrderId,
    operation_id: data.operation.id,
    workstation_id: data.workstation.id,
    equipment_id: data.equipment.id,
    type: data.type.toUpperCase(),
    qty: Number(data.qty)
  }

  return schema
}

export {
  mapToProductionRecordSchema
}