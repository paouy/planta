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

const deleteManyBySalesOrderId = (salesOrderId) => {
  const statement = sql(`
    with
      sales_order_jobs as (
        SELECT
          j.id
        FROM
          jobs AS j
        JOIN
          production_orders AS po
        ON
          j.production_order_id = po.id
        JOIN
          sales_order_items AS soi
        ON
          po.sales_order_item_id = soi.id
        JOIN
          sales_orders AS so
        ON
          soi.sales_order_id = so.id
        WHERE
          so.id = ?
      )

    delete from
      operation_batch_jobs
    where
      job_id in (select id from sales_order_jobs)
  `)

  const result = statement.run(salesOrderId)

  return result
}

export const createOperationBatchJobRepository = () => {
  return {
    insertOne,
    deleteOne,
    deleteManyBySalesOrderId
  }
}