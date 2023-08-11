const transformToProductionRecordEntity = (schema) => {
  const {
    id,
    production_order_id,
    operation_id,
    workstation_id,
    equipment_id,
    type,
    qty,
    operation_name,
    workstation_name,
    equipment_name,
    time_taken_mins
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
    type: type.toUpperCase(),
    qty: Number(qty),
    timeTakenMins: Number(time_taken_mins)
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

  return productionRecord
}

export {
  transformToProductionRecordEntity
}