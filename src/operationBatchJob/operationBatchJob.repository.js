import { sql } from '../sqlite.js'
import { mapToOperationBatchJobSchema } from './operationBatchJob.schema.js'

const insertOne = (data) => {
  data = mapToOperationBatchJobSchema(data)

  const statement = sql(`
    insert into
      operation_batch_jobs (
        operation_batch_id,
        job_id
      )
      values (
        @operation_batch_id,
        @job_id
      )
  `)
  
  const result = statement.run(data)

  return result
}

const deleteOne = (data) => {
  data = mapToOperationBatchJobSchema(data)

  const statement = sql(`
    delete from
      operation_batch_jobs
    where
      operation_batch_id = @operation_batch_id
    and
      job_id = @job_id
  `)

  const result = statement.run(data)

  return result
}

export const createOperationBatchJobRepository = () => {
  return {
    insertOne,
    deleteOne
  }
}