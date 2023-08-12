import { sql, txn, setValues } from '../sqlite.js'
import { mapToJobSchema } from './job.schema.js'

const insertMany = (data) => {
  data = data.map(mapToJobSchema)

  const statement = sql(`
    insert into
      jobs (
        id,
        production_order_id,
        operation_id,
        status,
        seq
      )
      values (
        @id,
        @production_order_id,
        @operation_id,
        @status,
        @seq
      )
  `)

  const transaction = txn(jobs => {
    for (const job of jobs) {
      statement.run(job)
    }
  })

  return transaction(data)
}

const findAllByProductionOrderId = (productionOrderId) => {
  const statement = sql(`
    select
      j.id,
      j.seq,
      j.production_order_id,
      j.operation_id,
      j.workstation_id,
      j.status,
      j.qty_output,
      j.qty_reject,
      j.qty_rework,
      j.qty_shortfall,
      j.time_taken_mins,
      po.public_id as production_order_public_id,
      po.qty as qty_demand,
      o.name as operation_name,
      o.time_per_cycle_mins as operation_time_per_cycle_mins,
      o.is_batch as operation_is_batch,
      w.name as workstation_name,
      (pj.qty_output - pj.qty_reject + pj.qty_rework) as qty_input
    from
      jobs j
    join
      production_orders po
    on
      j.production_order_id = po.id
    join
      operations o
    on
      j.operation_id = o.id
    left join
      workstations w
    on
      j.workstation_id = w.id
    left join
      jobs pj
    on
      j.production_order_id = pj.production_order_id
    and
      j.seq = pj.seq + 1
    where
      j.production_order_id = ?
    order by
      o.seq
  `)

  const results = statement.all(productionOrderId)

  return results
}

const findAllByOperationBatchId = (operationBatchId) => {
  const statement = sql(`
    select
      j.id,
      j.seq,
      j.production_order_id,
      j.operation_id,
      j.workstation_id,
      j.status,
      j.qty_output,
      j.qty_reject,
      j.qty_rework,
      j.qty_shortfall,
      j.time_taken_mins,
      po.public_id as production_order_public_id,
      po.qty as qty_demand,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom,
      o.name as operation_name,
      o.time_per_cycle_mins as operation_time_per_cycle_mins,
      o.is_batch as operation_is_batch,
      w.name as workstation_name,
      (pj.qty_output - pj.qty_reject + pj.qty_rework) as qty_input
    from
      jobs j
    inner join
      operation_batch_jobs obj
    on
      j.id = obj.job_id
    and
      obj.operation_batch_id = ?
    join
      production_orders po
    on
      j.production_order_id = po.id
    and
      po.status != 'CANCELLED'
    join
      products p
    on
      p.id = po.product_id
    join
      operations o
    on
      j.operation_id = o.id
    join
      workstations w
    on
      j.workstation_id = w.id
    left join
      jobs pj
    on
      j.production_order_id = pj.production_order_id
    and
      j.seq = pj.seq + 1
    order by
      po.priority,
      po.id
  `)

  const results = statement.all(operationBatchId)

  return results
}

const findAllWithProductionOrderNotReleased = ()=> {
  const statement = sql(`
    with operation_batch_jobs_not_closed as (
      select
        *
      from
        operation_batch_jobs obj
      join
        operation_batches ob
      on
        obj.operation_batch_id = ob.id
      where
        ob.status != 'CLOSED'
    )

    select
      j.id,
      j.seq,
      j.production_order_id,
      j.operation_id,
      j.workstation_id,
      j.status,
      j.qty_output,
      j.qty_reject,
      j.qty_rework,
      j.qty_shortfall,
      j.time_taken_mins,
      po.public_id as production_order_public_id,
      po.qty as qty_demand,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom,
      o.name as operation_name,
      o.time_per_cycle_mins as operation_time_per_cycle_mins,
      o.is_batch as operation_is_batch,
      w.name as workstation_name,
      (pj.qty_output - pj.qty_reject + pj.qty_rework) as qty_input,
      obj.operation_batch_id
    from
      jobs j
    join
      production_orders po
    on
      j.production_order_id = po.id
    join
      products p
    on
      p.id = po.product_id
    join
      operations o
    on
      j.operation_id = o.id
    left join
      workstations w
    on
      j.workstation_id = w.id
    left join
      jobs pj
    on
      j.production_order_id = pj.production_order_id
    and
      j.seq = pj.seq + 1
    and
      pj.status = 'CLOSED'
    left join
      operation_batch_jobs_not_closed obj
    on
      j.id = obj.job_id
    where
      po.is_released = 0
    and
      po.status != 'CANCELLED'
    order by
      po.priority,
      po.id
  `)

  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToJobSchema(data)

  const statement = sql(`update jobs ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const updateOneByProductionOrderIdAndOperationId = (data) => {
  data = mapToJobSchema(data)

  const statement = sql(`
    update
      jobs
      ${setValues(data)}
    where
      production_order_id = @production_order_id
    and
      operation_id = @operation_id
  `)

  const result = statement.run(data)

  return result
}

const updateMany = (data) => {
  data = data.map(mapToJobSchema)

  const transaction = txn(jobs => {
    for (const job of jobs) {
      sql(`update jobs ${setValues(job)} where id = @id`).run(job)
    }
  })

  return transaction(data)
}

const cancelManyNotClosedBySalesOrderId = (salesOrderId) => {
  const statement = sql(`
    with
      relevant_production_orders as (
        SELECT
          po.id
        FROM
          production_orders po
        JOIN
          sales_order_items soi
        ON
          po.sales_order_item_id = soi.id
        JOIN
          sales_orders so
        ON
          soi.sales_order_id = so.id
        WHERE
          so.id = ?
      )

    update
      jobs
    set
      status = 'CANCELLED'
    where
      production_order_id in (select id from relevant_production_orders)
    and
      status != 'CLOSED'
  `)

  const result = statement.run(salesOrderId)

  return result
}

export const createJobRepository = () => {
  return {
    insertMany,
    findAllByProductionOrderId,
    findAllByOperationBatchId,
    findAllWithProductionOrderNotReleased,
    updateOne,
    updateOneByProductionOrderIdAndOperationId,
    cancelManyNotClosedBySalesOrderId,
    updateMany
  }
}