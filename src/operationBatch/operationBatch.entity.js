const transformToOperationBatchEntity = (schema) => {
  const {
    id,
    public_id,
    operation_id,
    workstation_id,
    status,
    schedule,
    workstation_name,
    job_count = 0
  } = schema

  const operationBatch = {
    id,
    publicId: public_id,
    operationId: operation_id,
    workstation: {
      id: workstation_id,
      name: workstation_name
    },
    status,
    schedule,
    jobCount: Number(job_count)
  }

  return operationBatch
}

export {
  transformToOperationBatchEntity
}