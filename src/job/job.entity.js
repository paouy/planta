const transformToJobEntity = (schema) => {
  const {
    id,
    seq,
    production_order_id,
    product_sku,
    product_name,
    product_uom,
    operation_id,
    workstation_id,
    status,
    qty_demand = 0,
    qty_input = 0,
    qty_output = 0,
    qty_reject = 0,
    qty_rework = 0,
    qty_shortfall = 0,
    time_taken_mins = 0,
    production_order_public_id,
    operation_name,
    operation_time_per_cycle_mins = 0,
    operation_is_batch = false,
    workstation_name,
    operation_batch_id
  } = schema

  const job = {
    id,
    seq: Number(seq),
    productionOrder: {
      id: production_order_id,
      publicId: production_order_public_id
    },
    operation: {
      id: operation_id,
      name: operation_name
    },
    workstation: null,
    status,
    qtyInput: Number(seq) > 1 ? Number(qty_input) : Number(qty_demand),
    qtyOutput: Number(qty_output),
    qtyReject: Number(qty_reject),
    qtyRework: Number(qty_rework),
    qtyShortfall: Number(qty_shortfall),
    timeTakenMins: Number(time_taken_mins)
  }

  if (workstation_id && workstation_name) {
    job.workstation = {
      id: workstation_id,
      name: workstation_name
    }
  }

  if (operation_is_batch) {
    job.timeEstimatedMins = operation_time_per_cycle_mins
  } else {
    job.timeEstimatedMins = job.qtyInput * Number(operation_time_per_cycle_mins)
  }

  if (product_sku && product_name && product_uom) {
    job.product = {
      normalizedName: `[${product_sku}] ${product_name}`,
      uom: product_uom
    }
  }

  if (operation_batch_id) {
    job.operationBatchId = operation_batch_id
  }

  return job
}

export {
  transformToJobEntity
}