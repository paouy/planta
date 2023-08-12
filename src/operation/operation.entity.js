const transformToOperationEntity = (schema) => {
  const {
    id,
    name,
    seq,
    time_per_cycle_mins,
    allows_rework,
    has_equipment,
    is_batch,
    batch_size_parameter
  } = schema

  const operation = {
    id,
    name,
    seq: Number(seq),
    timePerCycleMins: Number(time_per_cycle_mins),
    allowsRework: Boolean(allows_rework),
    hasEquipment: Boolean(has_equipment),
    isBatch: Boolean(is_batch),
    batchSizeParameter: batch_size_parameter
  }

  return operation
}

export {
  transformToOperationEntity
}