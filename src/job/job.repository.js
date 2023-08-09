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
      j.time_taken_mins,
      po.public_id as production_order_public_id,
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
      j.time_taken_mins,
      po.public_id as production_order_public_id,
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
      j.time_taken_mins,
      po.public_id as production_order_public_id,
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
      po.is_released = 0
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

export const createJobRepository = () => {
  return {
    insertMany,
    findAllByProductionOrderId,
    findAllByOperationBatchId,
    findAllWithProductionOrderNotReleased,
    updateOne
  }
}