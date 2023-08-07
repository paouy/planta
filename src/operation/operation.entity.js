const transformToOperationEntity = (row) => {
  const {
    id,
    name,
    seq,
    time_per_cycle_mins,
    allows_rework,
    is_batch,
    batch_size_parameter
  } = row

  const operation = {
    id,
    name,
    seq: Number(seq),
    timePerCycleMins: Number(time_per_cycle_mins),
    allowsRework: Boolean(allows_rework),
    isBatch: Boolean(is_batch),
    batchSizeParameter: batch_size_parameter
  }

  return operation
}

export {
  transformToOperationEntity
}