import { sql, setValues } from '../sqlite.js'
import { mapToProductionRecordSchema } from './productionRecord.schema.js'

const insertOne = (data) => {
  data = mapToProductionRecordSchema(data)

  const statement = sql(`
    insert into
      production_records (
        id,
        production_order_id,
        operation_id,
        workstation_id,
        equipment_id,
        worker_id,
        type,
        qty,
        time_taken_mins
      )
      values (
        @id,
        @production_order_id,
        @operation_id,
        @workstation_id,
        @equipment_id,
        @worker_id,
        @type,
        @qty,
        @time_taken_mins
      )
    returning
      id
  `)
  
  const { id } = statement.get(data)
  const result = findOne(id)

  return result
}

const findOne = (id) => {
  const statement = sql(`
    select
      pr.id,
      pr.production_order_id,
      pr.operation_id,
      pr.workstation_id,
      pr.equipment_id,
      pr.worker_id,
      pr.type,
      pr.qty,
      pr.time_taken_mins,
      o.name as operation_name,
      w.name as workstation_name,
      e.name as equipment_name,
      wkr.public_id as worker_public_id,
      wkr.first_name as worker_first_name,
      wkr.last_name as worker_last_name
    from
      production_records pr
    join
      operations o
    on
      pr.operation_id = o.id
    left join
      workstations w
    on
      pr.workstation_id = w.id
    left join
      equipments e
    on
      pr.equipment_id = e.id
    left join
      workers wkr
    on
      pr.worker_id = wkr.id
    where
      pr.id = ?
  `)

  const result = statement.get(id)

  return result
}

const findAllBetweenIds = (data) => {
  const condition = data.to ? 'pr.id between @from and @to' : 'pr.id >= @from'

  const statement = sql(`
    select
      pr.id,
      pr.production_order_id,
      pr.operation_id,
      pr.workstation_id,
      pr.equipment_id,
      pr.worker_id,
      pr.type,
      pr.qty,
      pr.time_taken_mins,
      po.public_id as production_order_public_id,
      o.name as operation_name,
      o.is_batch as operation_is_batch,
      o.time_per_cycle_mins as operation_time_per_cycle_mins,
      w.name as workstation_name,
      e.name as equipment_name,
      wkr.public_id as worker_public_id,
      wkr.first_name as worker_first_name,
      wkr.last_name as worker_last_name
    from
      production_records pr
    join
      production_orders po
    on
      pr.production_order_id = po.id
    join
      operations o
    on
      pr.operation_id = o.id
    left join
      workstations w
    on
      pr.workstation_id = w.id
    left join
      equipments e
    on
      pr.equipment_id = e.id
    left join
      workers wkr
    on
      pr.worker_id = wkr.id
    where
      ${condition}
  `)

  const results = statement.all(data)

  return results
}

const findAllByProductionOrderId = (productionOrderId) => {
  const statement = sql(`
    select
      pr.id,
      pr.production_order_id,
      pr.operation_id,
      pr.workstation_id,
      pr.equipment_id,
      pr.worker_id,
      pr.type,
      pr.qty,
      pr.time_taken_mins,
      o.name as operation_name,
      w.name as workstation_name,
      e.name as equipment_name,
      wkr.public_id as worker_public_id,
      wkr.first_name as worker_first_name,
      wkr.last_name as worker_last_name
    from
      production_records pr
    join
      operations o
    on
      pr.operation_id = o.id
    left join
      workstations w
    on
      pr.workstation_id = w.id
    left join
      equipments e
    on
      pr.equipment_id = e.id
    left join
      workers wkr
    on
      pr.worker_id = wkr.id
    where
      pr.production_order_id = ?
    order by
      pr.id,
      o.seq
  `)

  const results = statement.all(productionOrderId)

  return results
}

export const createProductionRecordRepository = () => {
  return {
    insertOne,
    findAllBetweenIds,
    findAllByProductionOrderId
  }
}