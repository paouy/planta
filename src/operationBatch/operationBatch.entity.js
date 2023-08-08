const transformToOperationBatchEntity = (schema) => {
  const {
    id,
    public_id,
    operation_id,
    workstation_id,
    status,
    schedule,
    workstation_name
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
    schedule
  }

  return operationBatch
}

export {
  transformToOperationBatchEntity
}