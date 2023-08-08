const transformToJobEntity = (schema) => {
  const {
    id,
    seq,
    production_order_id,
    operation_id,
    workstation_id,
    status,
    qty_input,
    qty_output,
    qty_reject,
    qty_rework,
    time_taken_mins,
    production_order_public_id,
    operation_name,
    operation_time_per_cycle_mins,
    operation_is_batch,
    workstation_name
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
    qtyInput: Number(qty_input),
    qtyOutput: Number(qty_output),
    qtyReject: Number(qty_reject),
    qtyRework: Number(qty_rework),
    timeTakenMins: Number(time_taken_mins),
    timeEstimatedMins: Number(qty_input) * Number(operation_time_per_cycle_mins)
  }

  if (workstation_id && workstation_name) {
    job.workstation = {
      id: workstation_id,
      name: workstation_name
    }
  }

  if (operation_is_batch) {
    job.timeEstimatedMins = operation_time_per_cycle_mins
  }

  return job
}

export {
  transformToJobEntity
}