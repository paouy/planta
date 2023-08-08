const mapToOperationBatchJobSchema = (data) => {
  const schema = {
    operation_batch_id: data.operationBatchId,
    job_id: data.jobId
  }

  return schema
}

export {
  mapToOperationBatchJobSchema
}