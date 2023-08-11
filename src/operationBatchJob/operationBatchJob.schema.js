const mapToOperationBatchJobSchema = (data) => {
  const schema = {
    operation_batch_id: data.operationBatchId,
    job_id: data.id
  }

  return schema
}

export {
  mapToOperationBatchJobSchema
}